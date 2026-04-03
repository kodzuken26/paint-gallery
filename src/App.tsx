import Header from "./components/header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import Catalog from "./components/catalog/Catalog";

function App() {
  return (
    <>
      <ThemeProvider>
        <div>
          <Header />
          <Catalog />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
