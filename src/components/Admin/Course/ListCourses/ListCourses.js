import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Course } from "../../../../api";
import { CourseItem } from "../CourseItem";
import "./ListCourses.scss";

const courseController = new Course();

export function ListCourses(props) {
  const {reload, onReload} = props
  const [courses, setCourses] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ page, limit: 10 });
        console.log(response);
        setCourses(response.docs); // Guarda solo los "docs" del response
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

  if (!courses) return <Loader active inline="centered" />;
  if (size(courses) === 0) return "No hay ningún curso.";

  return (
    <div className="list-courses">
      {map(courses, (course) => (
        <CourseItem key={course._id} course={course} onReload={onReload} />
      ))}
      <div className="list-courses__pagination">
        <Pagination
          totalPages={pagination.pages}
          activePage={page}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}

/*
import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Course } from "../../../../api";
import { CourseItem } from "../CourseItem";
import "./ListCourses.scss"

const courseController = new Course();

export function ListCourses() {
  const [courses, setCourses] = useState(false);
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState()

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({page, limit:5});
        console.log(response)
        setCourses(response.docs); // yo solo quiero guardar los "docs" del response
        setPagination({
            limit: response.limit,
            page: response.page,
            pages: response.pages,
            total: response.total
        })
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);


  const changePage = (_, data) =>{
    setPage(data.activePage)
  }

  if (!courses) return <Loader active inline="centered" />;
  if (size(courses) === 0) return "No hay ningún curso.";

  return (
    <div className="list-courses">
      {map(courses, (course) => (
        <CourseItem key={course._id} course={course} />
      ))}
      <div className="list-courses__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
*/
