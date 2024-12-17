import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/Auth.context";
import { SocketProvider } from "./context/Socket.context";
import { ToolsProvider } from "./context/Tools.context";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <SocketProvider>
          <ToolsProvider>
            <App />
            <Toaster></Toaster>
          </ToolsProvider>
        </SocketProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
