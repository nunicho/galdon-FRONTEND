import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { WebRouter, AdminRouter } from "./routes";
import { AuthProvider } from "./contexts";
//OBSERVACION PERSONAL 4 
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>  
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="*" element={<WebRouter />} />
        </Routes>
      </HashRouter>
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
