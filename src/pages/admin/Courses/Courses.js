import React, {useState} from "react";
import {Tab, Button} from "semantic-ui-react"
import {BasicModal} from '../../../components/Shared/BasicModal/BasicModal'
import {ListCourses, CourseForm} from "../../../components/Admin/Course"
import "./Courses.scss"


export function Courses() {

  const [showModal, setShowModal] = useState(false)
  const [reload, setReload] = useState(false)

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState)
  const onReload = () =>setReload((prevState)=>!prevState)


  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListCourses reload={reload} onReload={onReload}/> 
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
    <div>
      <div className="courses-page">
        <div className="courses-page__add">
          <Button primary onClick={onOpenCloseModal}>
            Nuevo Curso
          </Button>
        </div>
        <Tab menu={{ secondary: true}} panes={panes}/>
      </div>
    </div>

    <BasicModal show={showModal} close={onOpenCloseModal} title={"Crear curso"}>
        <CourseForm onClose={onOpenCloseModal} onReload={onReload}
        />
    </BasicModal>
   </>
  );
}
