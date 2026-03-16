import { useState } from "react";
import Header from "./components/header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css"

function App() {
  return (
    <>
      <ThemeProvider>
        <div>
          
         <Header />
        </div>
      </ThemeProvider>
      
    </>
  );
}

export default App;
