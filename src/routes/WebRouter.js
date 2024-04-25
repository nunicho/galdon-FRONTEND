import React from 'react'
import {Routes, Route} from "react-router-dom"
import {ClientLayout} from "../layouts"
import {Home, Blog, Contact, Courses, Post} from "../pages/web"


  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };


export function WebRouter() {
  return (
    <Routes>
      <Route exact path="/" element={loadLayout(ClientLayout, Home)} />
      <Route exact path="/courses" element={loadLayout(ClientLayout, Courses)} />
      <Route exact path="/contact" element={loadLayout(ClientLayout, Contact)} />
      <Route exact path="/blog" element={loadLayout(ClientLayout, Blog)} />
      <Route exact path="/blog/:path" element={loadLayout(ClientLayout, Post)} />
    </Routes>
  );
}

/*
import React from 'react'
import {Routes, Route} from "react-router-dom"
import {ClientLayout} from "../layouts"
import {Home, Blog, Contact, Courses, Post} from "../pages/web"


  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };


export function WebRouter() {
  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/courses" element={loadLayout(ClientLayout, Courses)} />
      <Route path="/contact" element={loadLayout(ClientLayout, Contact)} />
      <Route path="/blog" element={loadLayout(ClientLayout, Blog)} />
      <Route path="/blog/:path" element={loadLayout(ClientLayout, Post)} />
    </Routes>
  );
}
*/