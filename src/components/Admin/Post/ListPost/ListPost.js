import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { Post } from "../../../../api";
import { PostItem } from "../PostItem";
import "./ListPost.scss";

const postController = new Post();

export function ListPost(props) {
  const { reload, onReload} = props
  const [posts, setPosts] = useState(false);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1)

  //console.log(pagination)

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPosts(page);
        setPosts(response.docs); //se agrega .docs porque es por el paginate
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.totalPages, // Cambia a totalPages
          total: response.totalDocs, // Cambia a totalDocs
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };


  if (!posts) return <Loader active inline="centered" />;
  if (size(posts) === 0) return "No hay ningun post";

  return (
    <div className="list-post">
      {map(posts, (post) => (
        <PostItem key={post._id} post={post} onReload={onReload} />
      ))}
      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          activePage={page}
          onPageChange={changePage}
        ellipsisItem={false}
        firstItem={false}
        lastItem={false}
        />
      </div>
    </div>
  );
}
