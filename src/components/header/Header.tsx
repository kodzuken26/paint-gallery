import logoLightImage from "../../assets/images/logo_light.png";
import darkBtnImage from "../../assets/images/dark_btn.png";
import logoDarkImage from "../../assets/images/logo_dark.png";
import lightBtnImage from "../../assets/images/light_btn.png";

import "./header.scss";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Header() {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <>
      <div className={`header-block ${theme}`}>
        <img
          src={theme === "light" ? logoLightImage : logoDarkImage}
          alt="logo-light"
          className="logo"
        />
        <img
          src={theme === "light" ? darkBtnImage : lightBtnImage}
          id="btn"
          alt="moon-btn "
          onClick={toggleTheme}
          className="btn-theme"
        />
      </div>
    </>
  );
}

export default Header;
