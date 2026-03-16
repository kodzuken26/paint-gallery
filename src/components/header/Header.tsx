import logoLightImage from "../../assets/images/logo_light.png";
import darkBtnImage from "../../assets/images/dark_btn.png";

import "./header.scss";
import { useContext } from "react";
import { ThemeContext } from '../../context/ThemeContext';

function Header() {
  const context = useContext(ThemeContext);

  
  if (!context) return null; 
  
  const { theme, toggleTheme } = context;

  

  return (
    <>
      <div className={`header-block ${theme}`}>
        <img src={logoLightImage} alt="logo-light" className="logo" />
        <button onClick={toggleTheme}>
          <img
            src={darkBtnImage}
            id="btn"
            alt="moon-btn "
            
          />
        </button>
      </div>
    </>
  );
}

export default Header;


