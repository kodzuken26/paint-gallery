import logoLightImage from "../../assets/images/logo_light.png";
import darkBtnImage from "../../assets/images/dark_btn.png";
import logoDarkImage from "../../assets/images/logo_dark.png";
import lightBtnImage from "../../assets/images/light_btn.png";

import styles from "./header.module.scss";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Header() {
  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme, toggleTheme } = context;

  return (
    <>
      <div className={`${styles["headerBlock"]} ${styles[theme]}`}>
        <img
          src={theme === "light" ? logoLightImage : logoDarkImage}
          alt="logo-light"
          className={styles.logo}
        />
        <img
          src={theme === "light" ? darkBtnImage : lightBtnImage}
          id="btn"
          alt="moon-btn "
          onClick={toggleTheme}
          className={styles.btnTheme}
        />
      </div>
    </>
  );
}

export default Header;
