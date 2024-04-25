import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WebRouter, AdminRouter } from "./routes";
import { AuthProvider } from "./contexts";
//OBSERVACION PERSONAL 4 
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>  
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="*" element={<WebRouter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

/*
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./routes";
import {AuthProvider} from "./contexts"

export default function app() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}
*/
