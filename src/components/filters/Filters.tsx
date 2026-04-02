import searchImage from "../../assets/images/search_icon.png";
import searchDarkImage from "../../assets/images/search_dark.png";
import crossImage from "../../assets/images/cross_mini.png";
import crossDarkImage from "../../assets/images/cross_dark.png";
import filterLightImage from "../../assets/images/filters_btn_light.png";
import filterDarkImage from "../../assets/images/filters_btn_dark.png";

import styles from "./filters.module.scss";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";


function Filters() {

    const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme} = context;
    // const [searchTerm, setSearchTerm] = useState('');

    // const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return (
        <>
            <div className={styles.menu}>
                <div className={styles.searchInput}>
                    <img src={theme === "light" ? searchImage : searchDarkImage} alt="search" className={styles.searchImg} />
                    <input type="text" placeholder="Painting title" className={styles.search} />
                    <img src={theme === "light" ? crossImage : crossDarkImage} alt="clean" className={styles.crossImg} />
                </div>
                <div className={styles.filtersBlock}>
                    <img className={styles.filtersBtn} src={theme === "light" ?  filterLightImage : filterDarkImage} />
                </div>
            </div>
        </>
    )
}

export default Filters