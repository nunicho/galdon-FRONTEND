import React from "react";
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./routes";
import { AuthProvider } from "./contexts";

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
