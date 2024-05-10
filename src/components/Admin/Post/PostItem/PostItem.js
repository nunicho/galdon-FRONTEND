import React, {useState} from 'react'
import {Button, Icon, Confirm} from "semantic-ui-react"
import {Link} from "react-router-dom" 
import {BasicModal} from "../../../Shared"
import {PostForm} from "../PostForm"
import "./PostItem.scss"

export function PostItem(props) {
    const {post, onReload} = props
    const [showModal, setShowModal] = useState(false)
    
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState)

  return (
    <>
      <div className="post-item">
        <div className="post-item__info">
          <span className="post-item__info-title">{post.title}</span>
          <span className="post-item__info-path">{post.path}</span>
        </div>
        <div>
            <Button as={Link} icon to={`/blog/${post.path}`} target="_blank">
                <Icon name="eye" />
            </Button>
            <Button icon primary onClick={onOpenCloseModal}>
                <Icon name="pencil"/>
            </Button>
            <Button icon color="red">
                <Icon name="trash"/>
            </Button>
        </div>
        <BasicModal show={showModal} close={onOpenCloseModal} title="Editar post" size="large">
            <PostForm close={onOpenCloseModal} onReload={onReload} post={post} />
        </BasicModal>
      </div>
    </>
  );
}
