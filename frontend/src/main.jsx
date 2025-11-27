import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./tailadminsrc/context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <HelmetProvider>
         <ThemeProvider>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ThemeProvider>
      </HelmetProvider>
   </StrictMode>
);
