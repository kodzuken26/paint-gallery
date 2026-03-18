import { useState } from "react";
import Header from "./components/header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import Filters from "./components/filters/Filters";
import Catalog from "./components/catalog/Catalog";

function App() {
  return (
    <>
      <ThemeProvider>
        <div>
          <Header />
                  <Filters />
                  <Catalog/>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
