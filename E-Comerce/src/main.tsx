import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
