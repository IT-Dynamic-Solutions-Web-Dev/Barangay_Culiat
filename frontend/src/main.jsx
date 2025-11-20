import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./tailadminsrc/context/ThemeContext";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <HelmetProvider>
         <ThemeProvider>
            <App />
         </ThemeProvider>
      </HelmetProvider>
   </StrictMode>
);
