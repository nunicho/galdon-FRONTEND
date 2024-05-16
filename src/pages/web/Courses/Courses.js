import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { map } from "lodash";
import { Course as CourseController } from "../../../api";
import { image } from "../../../assets";
import { Course } from "../../../components/Web/Courses";
import "./Courses.scss";
// OBSERVACIÓN PERSONAL 8
const courseController = new CourseController();

export function Courses() {
  const [courses, setCourses] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const isCurrentLastPage = pagination && pagination.page === pagination.pages;

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ page, limit: 9 });
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.totalPages, // Cambia a totalPages
          total: response.totalDocs, // Cambia a totalDocs
        });
        console.log(`Total pages es ${response.totalPages}`);
        setCourses((prevCourses) => {
          if (!prevCourses) {
            return response.docs;
          } else {
            return [...prevCourses, ...response.docs];
          }
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]); // Se mantiene 'page' como única dependencia

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container className="courses-page">
      <Image src={image.academyLogo} />
      <h2>
        En la web vas a encontrar los mejores cursos online de programación en
        Español. Unete a nosotros y empieza tu camino como programador frontend
        o backend
      </h2>

      <div className="courses">
        {map(courses, (course) => (
          <div key={courses._id} className="courses__item">
            <Course course={course} />
          </div>
        ))}
      </div>
      {!isCurrentLastPage && (
        <div className="more">
          <Button primary onClick={loadMore}>
            Cargar más...
          </Button>
        </div>
      )}
    </Container>
  );
}
