import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import UserProvider from "./context/userContext/UserProvider.jsx";

if (import.meta.env.VITE_MODE === "production") {
  console.log = () => {};
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Bounce}
      />
    </UserProvider>
  </BrowserRouter>
);
