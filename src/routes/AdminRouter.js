import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { Auth, Users, Blog, Courses, Menu, Newsletter } from "../pages/admin";


const user = { email: "pepe@gmail.com" };
export function AdminRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
      ) : (
        <>
          {["/admin", "/admin/blog"].map(
            (
              path // gracias a MAP tengo dos rutas en la misma "ruta"
            ) => (
              <Route
                key={path}
                path={path}
                element={loadLayout(AdminLayout, Blog)}
              />
            )
          )}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route
            path="/admin/courses"
            element={loadLayout(AdminLayout, Courses)}
          />
          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)} />
        </>
      )}
    </Routes>
  );
}
