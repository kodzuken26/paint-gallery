// import arrowPrevLight from "../../assets/images/arrow-prev-light.png";
// import arrowPrevDark from "../../assets/images/arrow-prev-dark.png";
// import arrowNextLight from "../../assets/images/arrow-next-light.png";
// import arrowNextDark from "../../assets/images/arrow-next-dark.png";
// import searchImage from "../../assets/images/search_icon.png";
// import crossImage from "../../assets/images/cross_mini.png";

// import { useMemo, useState, type FC } from "react";
// import styles from "./catalog.module.scss";
// import {
//   useGetPaintsQuery,
//   useGetAuthorsQuery,
//   useGetLocationsQuery,
// } from "../../store/paintApi";
// import { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";
// import Filters from "../filters/Filters";

// const Catalog: FC = () => {
//   const [page, setPage] = useState(1);
//     const limit = 6;
//     const totalPages = 6;

//     const [filters, setFilters] = useState({
//         authorId: '' as number | '',
//         locationId: '' as number | '',
//         yearFrom: '',
//         yearTo: ''
//     });

//   const { data: paintings, isLoading: isLoadingPaintings } = useGetPaintsQuery({
//     page,
//     limit,
//   });
//   const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsQuery();
//   const { data: locations, isLoading: isLoadingLocations } =
//     useGetLocationsQuery();

//   console.log("Paintings:", paintings);
//   console.log("Authors:", authors);
//   console.log("Locations:", locations);

  
// //   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   if (paintings && paintings[0]) {
//     console.log("First painting authorid:", paintings[0].authorId);
//     console.log("First painting locationId:", paintings[0].locationId);
//   }

//   if (authors) {
//     console.log(
//       "Author IDs:",
//       authors.map((a) => ({ id: a.id, name: a.name })),
//     );
//   }
//   const paintingsWithDetails = useMemo(() => {
//     if (!paintings || !authors || !locations) return [];

//     const authorsMap = new Map(authors.map((a) => [a.id, a.name]));
//     const locationsMap = new Map(locations.map((l) => [l.id, l.location]));

//     return paintings.map((painting) => ({
//       ...painting,
//       authorName: authorsMap.get(painting.authorId) || "Unknown",
//       locationName: locationsMap.get(painting.locationId) || "Unknown",
//     }));
//   }, [paintings, authors, locations]);

//   if (isLoadingPaintings || isLoadingAuthors || isLoadingLocations) {
//     return <div>Loading...</div>;
//   }

//     const getVisiblePages = () => {
//         const delta = 2; // Сколько страниц показывать с каждой стороны от текущей
//         const range: number[] = [];
        
//         // Собираем страницы вокруг текущей (исключая первую и последнюю)
//         for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
//             range.push(i);
//         }
        
//         const result: (number | string)[] = [1];
        
//         // Добавляем многоточие перед диапазоном, если нужно
//         if (range[0] > 2) {
//             result.push('...');
//         }
        
//         // Добавляем диапазон страниц
//         result.push(...range);
        
//         // Добавляем многоточие после диапазона, если нужно
//         if (range[range.length - 1] < totalPages - 1) {
//             result.push('...');
//         }
        
//         // Добавляем последнюю страницу
//         if (totalPages > 1) {
//             result.push(totalPages);
//         }
        
//         return result;
//     };

//     const visiblePages = getVisiblePages();
    

//     const goToNextPage = () => {
//         if (page < totalPages) {
//             setPage(prev => prev + 1);
//         }
//     };

//     const goToPrevPage = () => {
//         setPage(prev => Math.max(1, prev - 1));
//     };

//     const goToPage = (pageNum: number) => {
//         setPage(pageNum);
//     };

//     const filteredPaintings = useMemo(() => {
//         if (!paintings) return [];

//         return paintings.filter(painting => {
//             // Фильтр по автору
//             if (filters.authorId && painting.authorId !== filters.authorId) {
//                 return false;
//             }

//             // Фильтр по локации
//             if (filters.locationId && painting.locationId !== filters.locationId) {
//                 return false;
//             }

//             // Фильтр по году
//             if (filters.yearFrom && painting.created < parseInt(filters.yearFrom)) {
//                 return false;
//             }
//             if (filters.yearTo && painting.created > parseInt(filters.yearTo)) {
//                 return false;
//             }

//             return true;
//         });
//     }, [paintings, filters]);

//     const handleApplyFilters = (newFilters: any) => {
//         setFilters(newFilters);
//     };

//     const handleClearFilters = () => {
//         setFilters({
//             authorId: '',
//             locationId: '',
//             yearFrom: '',
//             yearTo: ''
//         });
//     };


//   const context = useContext(ThemeContext);

//   if (!context) return null;

//   const { theme } = context;
//   return (
//       <>
//           <div className={styles.menu}>
//                   <div className={styles.searchInput}>
//                     <img src={searchImage} alt="search" />
//                     <input type="text" placeholder="Painting title" />
//                     <img src={crossImage} alt="clean" />
//                 </div>
                
//                 <Filters
//                     theme={theme}
//                     authors={authors || []}
//                     locations={locations || []}
//                     onApplyFilters={handleApplyFilters}
//                     onClearFilters={handleClearFilters}
//                 />
//           </div>
          
//           <div className={styles.catalogBlock}>
              
               
//         {paintingsWithDetails.map((element) => (
//             <div key={element.id} className={styles.paintingCard}>
//                 <div className={styles.paintingImgContainer}>
//               <img
//                         src={`https://test-front.framework.team${element.imageUrl}`}
//                         alt={element.name}
//                         className={styles.paintingImage}
//               />
//                     <div className={styles.textBlock}>
//                         <div className={styles.textGroup1}>
//                             <p className={styles.headingP}>{element.name}</p>
//                             <p className={styles.underP}>{element.created}</p>
//                 </div>
//                 <div className={styles.textGroup2}>
//                   <p className={styles.headingP}>{element.authorName}</p>
//                 <p className={styles.underP}>{element.locationName}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

              
             
        
//           </div>
          
//           <div className={styles.paginationBlock}>
//                 <button
//                   onClick={goToPrevPage}
//                   disabled={page === 1}
//                   className={styles.pageBtn}
//                 >
//                    <img src={theme === "light" ? arrowPrevLight : arrowPrevDark} />
//                 </button>

//               <div className={styles.pagesNumbers}>
//                     {visiblePages.map((p, index) => (
//                         <div
//                             key={index}
//                             onClick={() => typeof p === 'number' && goToPage(p)}
//                             className={`pageP ${p === page ? 'active' : ''} ${typeof p !== 'number' ? 'dots' : ''}`}
//                         >
//                             {p}
//                         </div>
//                     ))}
//                 </div>

//                 <button
//                   onClick={goToNextPage}
//                   disabled={page === totalPages}
//                   className={styles.pageBtn}
//                 >
//                     <img src={theme === "light" ? arrowNextLight : arrowNextDark} />
//                 </button>
//             </div>
//     </>
//   );
// };

// export default Catalog;






// import arrowPrevLight from "../../assets/images/arrow-prev-light.png";
// import arrowPrevDark from "../../assets/images/arrow-prev-dark.png";
// import arrowNextLight from "../../assets/images/arrow-next-light.png";
// import arrowNextDark from "../../assets/images/arrow-next-dark.png";
// import searchImage from "../../assets/images/search_icon.png";
// import crossImage from "../../assets/images/cross_mini.png";
// import filterLightImage from "../../assets/images/filters_btn_light.png";
// import filterDarkImage from "../../assets/images/filters_btn_dark.png";

// import { useMemo, useState, type FC } from "react";
// import styles from "./catalog.module.scss";
// import {
//   useGetPaintsQuery,
//   useGetAuthorsQuery,
//   useGetLocationsQuery,
// } from "../../store/paintApi";
// import { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";

// const Catalog: FC = () => {
//   const [page, setPage] = useState(1);
//   const limit = 6;
//   const totalPages = 6;

//   // Состояния для фильтров
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({
//     authorId: "" as number | "",
//     locationId: "" as number | "",
//     yearFrom: "",
//     yearTo: "",
//   });
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
//   const [isAuthorOpen, setIsAuthorOpen] = useState(false);
//   const [isLocationOpen, setIsLocationOpen] = useState(false);

//   const { data: paintings, isLoading: isLoadingPaintings } = useGetPaintsQuery({
//     page,
//     limit,
//   });
//   const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsQuery();
//   const { data: locations, isLoading: isLoadingLocations } =
//     useGetLocationsQuery();

//   // Объединяем данные картин с авторами и локациями
//   const paintingsWithDetails = useMemo(() => {
//     if (!paintings || !authors || !locations) return [];

//     const authorsMap = new Map(authors.map((a) => [a.id, a.name]));
//     const locationsMap = new Map(locations.map((l) => [l.id, l.location]));

//     return paintings.map((painting) => ({
//       ...painting,
//       authorName: authorsMap.get(painting.authorId) || "Unknown",
//       locationName: locationsMap.get(painting.locationId) || "Unknown",
//     }));
//   }, [paintings, authors, locations]);

//   // Фильтрация и поиск
//   const filteredPaintings = useMemo(() => {
//     if (!paintingsWithDetails) return [];

//     return paintingsWithDetails.filter((painting) => {
//       // Поиск по названию
//       const matchesSearch = painting.name
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());

//       // Фильтр по автору
//       if (filters.authorId && painting.authorId !== filters.authorId) {
//         return false;
//       }

//       // Фильтр по локации
//       if (filters.locationId && painting.locationId !== filters.locationId) {
//         return false;
//       }

//       // Фильтр по году
//       if (filters.yearFrom && painting.created < parseInt(filters.yearFrom)) {
//         return false;
//       }
//       if (filters.yearTo && painting.created > parseInt(filters.yearTo)) {
//         return false;
//       }

//       return matchesSearch;
//     });
//   }, [paintingsWithDetails, searchQuery, filters]);

//   // Очистка поиска
//   const clearSearch = () => {
//     setSearchQuery("");
//   };

//   // Применение фильтров
//   const handleApplyFilters = () => {
//     setIsFiltersOpen(false);
//   };

//   // Очистка всех фильтров
//   const handleClearFilters = () => {
//     setFilters({
//       authorId: "",
//       locationId: "",
//       yearFrom: "",
//       yearTo: "",
//     });
//     setIsFiltersOpen(false);
//   };

//   // Пагинация
//   const getVisiblePages = () => {
//     const delta = 2;
//     const range: number[] = [];

//     for (
//       let i = Math.max(2, page - delta);
//       i <= Math.min(totalPages - 1, page + delta);
//       i++
//     ) {
//       range.push(i);
//     }

//     const result: (number | string)[] = [1];

//     if (range[0] > 2) {
//       result.push("...");
//     }

//     result.push(...range);

//     if (range[range.length - 1] < totalPages - 1) {
//       result.push("...");
//     }

//     if (totalPages > 1) {
//       result.push(totalPages);
//     }

//     return result;
//   };

//   const visiblePages = getVisiblePages();

//   const goToNextPage = () => {
//     if (page < totalPages) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   const goToPrevPage = () => {
//     setPage((prev) => Math.max(1, prev - 1));
//   };

//   const goToPage = (pageNum: number) => {
//     setPage(pageNum);
//   };

//   if (isLoadingPaintings || isLoadingAuthors || isLoadingLocations) {
//     return <div>Loading...</div>;
//   }

//   const context = useContext(ThemeContext);
//   if (!context) return null;
//   const { theme } = context;

//   return (
//     <>
//       <div className={styles.menu}>
//         <div className={styles.searchInput}>
//           <img src={searchImage} alt="search" className={styles.searchImg} />
//           <input
//             type="text"
//             placeholder="Painting title"
//             className={styles.search}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           {searchQuery && (
//             <img
//               src={crossImage}
//               alt="clean"
//               className={styles.crossImg}
//               onClick={clearSearch}
//             />
//           )}
//         </div>

//         <div className={styles.filtersBlock}>
//           <img
//             className={styles.filtersBtn}
//             src={theme === "light" ? filterLightImage : filterDarkImage}
//             alt="filter"
//             onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//           />
//         </div>
//       </div>

//       {/* Выезжающая панель фильтров */}
//       {isFiltersOpen && (
//         <div className={styles.filterOverlay} onClick={() => setIsFiltersOpen(false)}>
//           <div className={styles.filterPanel} onClick={(e) => e.stopPropagation()}>
//             {/* Крестик для закрытия */}
//             <div className={styles.filterHeader}>
//               <h3 className={styles.filterTitle}>Фильтры</h3>
//               <img
//                 src={crossImage}
//                 alt="close"
//                 className={styles.filterClose}
//                 onClick={() => setIsFiltersOpen(false)}
//               />
//             </div>

//             <div className={styles.filterContent}>
//               {/* Фильтр по автору */}
//               <div className={styles.filterGroup}>
//                 <label className={styles.filterLabel}>Автор</label>
//                 <div className={styles.customSelect}>
//                   <div
//                     className={styles.selectHeader}
//                     onClick={() => setIsAuthorOpen(!isAuthorOpen)}
//                   >
//                     <span>
//                       {filters.authorId
//                         ? authors?.find((a) => a.id === filters.authorId)?.name
//                         : "Выберите автора"}
//                     </span>
//                     <span className={styles.arrow}>{isAuthorOpen ? "▲" : "▼"}</span>
//                   </div>
//                   {isAuthorOpen && (
//                     <div className={styles.selectList}>
//                       <div
//                         className={styles.selectItem}
//                         onClick={() => {
//                           setFilters({ ...filters, authorId: "" });
//                           setIsAuthorOpen(false);
//                         }}
//                       >
//                         Все авторы
//                       </div>
//                       {authors?.map((author) => (
//                         <div
//                           key={author.id}
//                           className={`${styles.selectItem} ${
//                             filters.authorId === author.id ? styles.active : ""
//                           }`}
//                           onClick={() => {
//                             setFilters({ ...filters, authorId: author.id });
//                             setIsAuthorOpen(false);
//                           }}
//                         >
//                           {author.name}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Фильтр по локации */}
//               <div className={styles.filterGroup}>
//                 <label className={styles.filterLabel}>Локация</label>
//                 <div className={styles.customSelect}>
//                   <div
//                     className={styles.selectHeader}
//                     onClick={() => setIsLocationOpen(!isLocationOpen)}
//                   >
//                     <span>
//                       {filters.locationId
//                         ? locations?.find((l) => l.id === filters.locationId)?.location
//                         : "Выберите локацию"}
//                     </span>
//                     <span className={styles.arrow}>{isLocationOpen ? "▲" : "▼"}</span>
//                   </div>
//                   {isLocationOpen && (
//                     <div className={styles.selectList}>
//                       <div
//                         className={styles.selectItem}
//                         onClick={() => {
//                           setFilters({ ...filters, locationId: "" });
//                           setIsLocationOpen(false);
//                         }}
//                       >
//                         Все локации
//                       </div>
//                       {locations?.map((location) => (
//                         <div
//                           key={location.id}
//                           className={`${styles.selectItem} ${
//                             filters.locationId === location.id ? styles.active : ""
//                           }`}
//                           onClick={() => {
//                             setFilters({ ...filters, locationId: location.id });
//                             setIsLocationOpen(false);
//                           }}
//                         >
//                           {location.location}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Фильтр по году */}
//               <div className={styles.filterGroup}>
//                 <label className={styles.filterLabel}>Год создания</label>
//                 <div className={styles.yearInputs}>
//                   <input
//                     type="number"
//                     placeholder="От"
//                     value={filters.yearFrom}
//                     onChange={(e) =>
//                       setFilters({ ...filters, yearFrom: e.target.value })
//                     }
//                     className={styles.yearInput}
//                   />
//                   <span className={styles.yearSeparator}>—</span>
//                   <input
//                     type="number"
//                     placeholder="До"
//                     value={filters.yearTo}
//                     onChange={(e) =>
//                       setFilters({ ...filters, yearTo: e.target.value })
//                     }
//                     className={styles.yearInput}
//                   />
//                 </div>
//               </div>

//               {/* Кнопки */}
//               <div className={styles.filterButtons}>
//                 <button
//                   className={`${styles.filterBtn} ${styles.clearBtn}`}
//                   onClick={handleClearFilters}
//                 >
//                   Очистить
//                 </button>
//                 <button
//                   className={`${styles.filterBtn} ${styles.applyBtn}`}
//                   onClick={handleApplyFilters}
//                 >
//                   Показать результаты
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className={styles.catalogBlock}>
//         {filteredPaintings.map((element) => (
//           <div key={element.id} className={styles.paintingCard}>
//             <div className={styles.paintingImgContainer}>
//               <img
//                 src={`https://test-front.framework.team${element.imageUrl}`}
//                 alt={element.name}
//                 className={styles.paintingImage}
//               />
//               <div className={styles.textBlock}>
//                 <div className={styles.textGroup1}>
//                   <p className={styles.headingP}>{element.name}</p>
//                   <p className={styles.underP}>{element.created}</p>
//                 </div>
//                 <div className={styles.textGroup2}>
//                   <p className={styles.headingP}>{element.authorName}</p>
//                   <p className={styles.underP}>{element.locationName}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={styles.paginationBlock}>
//         <button
//           onClick={goToPrevPage}
//           disabled={page === 1}
//           className={styles.pageBtn}
//         >
//           <img src={theme === "light" ? arrowPrevLight : arrowPrevDark} alt="prev" />
//         </button>

//         <div className={styles.pagesNumbers}>
//           {visiblePages.map((p, index) => (
//             <div
//               key={index}
//               onClick={() => typeof p === "number" && goToPage(p)}
//               className={`${styles.pageP} ${p === page ? styles.active : ""} ${
//                 typeof p !== "number" ? styles.dots : ""
//               }`}
//             >
//               {p}
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={goToNextPage}
//           disabled={page === totalPages}
//           className={styles.pageBtn}
//         >
//           <img src={theme === "light" ? arrowNextLight : arrowNextDark} alt="next" />
//         </button>
//       </div>
//     </>
//   );
// };

// export default Catalog;






import arrowPrevLight from "../../assets/images/arrow-prev-light.png";
import arrowPrevDark from "../../assets/images/arrow-prev-dark.png";
import arrowNextLight from "../../assets/images/arrow-next-light.png";
import arrowNextDark from "../../assets/images/arrow-next-dark.png";
import searchImage from "../../assets/images/search_icon.png";
import crossImage from "../../assets/images/cross_mini.png";
import filterLightImage from "../../assets/images/filters_btn_light.png";
import filterDarkImage from "../../assets/images/filters_btn_dark.png";
import plusImage from "../../assets/images/plus_icon.png";
import minusImage from "../../assets/images/minus_icon.png";

import { useMemo, useState, type FC, useEffect } from "react";
import styles from "./catalog.module.scss";
import {
  useGetPaintsQuery,
  useGetAuthorsQuery,
  useGetLocationsQuery,
} from "../../store/paintApi";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Catalog: FC = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalPages = 6;

  // Состояния для фильтров
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    authorId: "" as number | "",
    locationId: "" as number | "",
    yearFrom: "",
    yearTo: "",
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    
     const [isAuthorFilterOpen, setIsAuthorFilterOpen] = useState(false);
  const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);

  // Загружаем ВСЕ картины для поиска (без пагинации)
  const { data: allPaintings, isLoading: isLoadingAllPaintings } = useGetPaintsQuery({ 
    page: 1, 
    limit: 1000  // Загружаем много картин
  });
  
  // Загружаем картины для пагинации (только 6 на страницу)
  const { data: paginatedPaintings, isLoading: isLoadingPaintings } = useGetPaintsQuery({ page, limit });
  
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsQuery();
  const { data: locations, isLoading: isLoadingLocations } = useGetLocationsQuery();

  // Объединяем данные картин с авторами и локациями для ВСЕХ картин
  const allPaintingsWithDetails = useMemo(() => {
    if (!allPaintings || !authors || !locations) return [];

    const authorsMap = new Map(authors.map((a) => [a.id, a.name]));
    const locationsMap = new Map(locations.map((l) => [l.id, l.location]));

    return allPaintings.map((painting) => ({
      ...painting,
      authorName: authorsMap.get(painting.authorId) || "Unknown",
      locationName: locationsMap.get(painting.locationId) || "Unknown",
    }));
  }, [allPaintings, authors, locations]);

  // Объединяем данные для отображаемых картин (с пагинацией)
  const paginatedPaintingsWithDetails = useMemo(() => {
    if (!paginatedPaintings || !authors || !locations) return [];

    const authorsMap = new Map(authors.map((a) => [a.id, a.name]));
    const locationsMap = new Map(locations.map((l) => [l.id, l.location]));

    return paginatedPaintings.map((painting) => ({
      ...painting,
      authorName: authorsMap.get(painting.authorId) || "Unknown",
      locationName: locationsMap.get(painting.locationId) || "Unknown",
    }));
  }, [paginatedPaintings, authors, locations]);

  // Фильтрация и поиск по ВСЕМ картинам
  const filteredPaintings = useMemo(() => {
    if (!allPaintingsWithDetails) return [];

    let filtered = [...allPaintingsWithDetails];

    // Поиск по названию
    if (searchQuery) {
      filtered = filtered.filter((painting) =>
        painting.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по автору
    if (filters.authorId) {
      filtered = filtered.filter((painting) => painting.authorId === filters.authorId);
    }

    // Фильтр по локации
    if (filters.locationId) {
      filtered = filtered.filter((painting) => painting.locationId === filters.locationId);
    }

    // Фильтр по году
    if (filters.yearFrom) {
      filtered = filtered.filter((painting) => painting.created >= parseInt(filters.yearFrom));
    }
    if (filters.yearTo) {
      filtered = filtered.filter((painting) => painting.created <= parseInt(filters.yearTo));
    }

    return filtered;
  }, [allPaintingsWithDetails, searchQuery, filters]);

  // Отображаемые картины (с учетом поиска и пагинации)
  const displayedPaintings = useMemo(() => {
    // Если есть поиск или фильтры, показываем отфильтрованные результаты с пагинацией
    if (searchQuery || filters.authorId || filters.locationId || filters.yearFrom || filters.yearTo) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      return filteredPaintings.slice(startIndex, endIndex);
    }
    
    // Если нет фильтров, показываем обычную пагинацию
    return paginatedPaintingsWithDetails;
  }, [filteredPaintings, paginatedPaintingsWithDetails, searchQuery, filters, page, limit]);

  // Очистка поиска
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Применение фильтров
  const handleApplyFilters = () => {
    setIsFiltersOpen(false);
    setPage(1); // Сбрасываем на первую страницу при применении фильтров
  };

  // Очистка всех фильтров
  const handleClearFilters = () => {
    setFilters({
      authorId: "",
      locationId: "",
      yearFrom: "",
      yearTo: "",
    });
    setSearchQuery("");
    setPage(1);
    setIsFiltersOpen(false);
  };

  // Пагинация
  const getTotalPages = () => {
    // Если есть поиск или фильтры, считаем страницы отфильтрованных результатов
    if (searchQuery || filters.authorId || filters.locationId || filters.yearFrom || filters.yearTo) {
      return Math.ceil(filteredPaintings.length / limit);
    }
    return totalPages;
  };

  const actualTotalPages = getTotalPages();

  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(actualTotalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    const result: (number | string)[] = [1];

    if (range[0] > 2) {
      result.push("...");
    }

    result.push(...range);

    if (range[range.length - 1] < actualTotalPages - 1) {
      result.push("...");
    }

    if (actualTotalPages > 1) {
      result.push(actualTotalPages);
    }

    return result;
  };

  const visiblePages = getVisiblePages();

  const goToNextPage = () => {
    if (page < actualTotalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const goToPage = (pageNum: number) => {
    setPage(pageNum);
  };

  // Сбрасываем страницу при изменении поиска или фильтров
  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters]);

  if (isLoadingAllPaintings || isLoadingPaintings || isLoadingAuthors || isLoadingLocations) {
    return <div>Loading...</div>;
  }

  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  // Показываем сообщение, если ничего не найдено
  if (displayedPaintings.length === 0) {
    return (
      <>
        <div className={styles.menu}>
          <div className={styles.searchInput}>
            <img src={searchImage} alt="search" className={styles.searchImg} />
            <input
              type="text"
              placeholder="Painting title"
              className={styles.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <img
                src={crossImage}
                alt="clean"
                className={styles.crossImg}
                onClick={clearSearch}
              />
            )}
          </div>

          <div className={styles.filtersBlock}>
            <img
              className={styles.filtersBtn}
              src={theme === "light" ? filterLightImage : filterDarkImage}
              alt="filter"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            />
          </div>
        </div>
        <div className={styles.noResults}>
          <p>No matches for <b></b></p>
          <p>Please try again with a different spelling of keywords</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.menu}>
        <div className={styles.searchInput}>
          <img src={searchImage} alt="search" className={styles.searchImg} />
          <input
            type="text"
            placeholder="Painting title"
            className={styles.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <img
              src={crossImage}
              alt="clean"
              className={styles.crossImg}
              onClick={clearSearch}
            />
          )}
        </div>

        <div className={styles.filtersBlock}>
          <img
            className={styles.filtersBtn}
            src={theme === "light" ? filterLightImage : filterDarkImage}
            alt="filter"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          />
        </div>
      </div>

      {/* Выезжающая панель фильтров (остается без изменений) */}
      {isFiltersOpen && (
        <div className={styles.filterOverlay} onClick={() => setIsFiltersOpen(false)}>
          <div className={styles.filterPanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>Фильтры</h3>
              <img
                src={crossImage}
                alt="close"
                className={styles.filterClose}
                onClick={() => setIsFiltersOpen(false)}
              />
            </div>

            <div className={styles.filterContent}>
              {/* Фильтр по автору */}
              <div className={styles.filterGroup}>
                <div 
                  className={styles.filterHeaderGroup}
                  onClick={() => setIsAuthorFilterOpen(!isAuthorFilterOpen)}
                >
                  <label className={styles.filterLabel}>Автор</label>
                  <img
                    src={isAuthorFilterOpen ? minusImage : plusImage}
                    alt={isAuthorFilterOpen ? "minus" : "plus"}
                    className={styles.filterToggle}
                  />
                </div>
                
                {isAuthorFilterOpen && (
                  <div className={styles.customSelect}>
                    <div
                      className={styles.selectHeader}
                      onClick={() => setIsAuthorOpen(!isAuthorOpen)}
                    >
                      <span>
                        {filters.authorId
                          ? authors?.find((a) => a.id === filters.authorId)?.name
                          : "Выберите автора"}
                      </span>
                      <span className={styles.arrow}>{isAuthorOpen ? "▲" : "▼"}</span>
                    </div>
                    {isAuthorOpen && (
                      <div className={styles.selectList}>
                        <div
                          className={styles.selectItem}
                          onClick={() => {
                            setFilters({ ...filters, authorId: "" });
                            setIsAuthorOpen(false);
                          }}
                        >
                          Все авторы
                        </div>
                        {authors?.map((author) => (
                          <div
                            key={author.id}
                            className={`${styles.selectItem} ${
                              filters.authorId === author.id ? styles.active : ""
                            }`}
                            onClick={() => {
                              setFilters({ ...filters, authorId: author.id });
                              setIsAuthorOpen(false);
                            }}
                          >
                            {author.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Фильтр по локации */}
              <div className={styles.filterGroup}>
                <div 
                  className={styles.filterHeaderGroup}
                  onClick={() => setIsLocationFilterOpen(!isLocationFilterOpen)}
                >
                  <label className={styles.filterLabel}>Локация</label>
                  <img
                    src={isLocationFilterOpen ? minusImage : plusImage}
                    alt={isLocationFilterOpen ? "minus" : "plus"}
                    className={styles.filterToggle}
                  />
                </div>
                
                {isLocationFilterOpen && (
                  <div className={styles.customSelect}>
                    <div
                      className={styles.selectHeader}
                      onClick={() => setIsLocationOpen(!isLocationOpen)}
                    >
                      <span>
                        {filters.locationId
                          ? locations?.find((l) => l.id === filters.locationId)?.location
                          : "Выберите локацию"}
                      </span>
                      <span className={styles.arrow}>{isLocationOpen ? "▲" : "▼"}</span>
                    </div>
                    {isLocationOpen && (
                      <div className={styles.selectList}>
                        <div
                          className={styles.selectItem}
                          onClick={() => {
                            setFilters({ ...filters, locationId: "" });
                            setIsLocationOpen(false);
                          }}
                        >
                          Все локации
                        </div>
                        {locations?.map((location) => (
                          <div
                            key={location.id}
                            className={`${styles.selectItem} ${
                              filters.locationId === location.id ? styles.active : ""
                            }`}
                            onClick={() => {
                              setFilters({ ...filters, locationId: location.id });
                              setIsLocationOpen(false);
                            }}
                          >
                            {location.location}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Фильтр по году */}
              <div className={styles.filterGroup}>
                <div 
                  className={styles.filterHeaderGroup}
                  onClick={() => setIsYearFilterOpen(!isYearFilterOpen)}
                >
                  <label className={styles.filterLabel}>Год создания</label>
                  <img
                    src={isYearFilterOpen ? minusImage : plusImage}
                    alt={isYearFilterOpen ? "minus" : "plus"}
                    className={styles.filterToggle}
                  />
                </div>
                
                {isYearFilterOpen && (
                  <div className={styles.yearInputs}>
                    <input
                      type="number"
                      placeholder="От"
                      value={filters.yearFrom}
                      onChange={(e) =>
                        setFilters({ ...filters, yearFrom: e.target.value })
                      }
                      className={styles.yearInput}
                    />
                    <span className={styles.yearSeparator}>—</span>
                    <input
                      type="number"
                      placeholder="До"
                      value={filters.yearTo}
                      onChange={(e) =>
                        setFilters({ ...filters, yearTo: e.target.value })
                      }
                      className={styles.yearInput}
                    />
                  </div>
                )}
              </div>

              {/* Кнопки */}
              <div className={styles.filterButtons}>
                <button
                  className={`${styles.filterBtn} ${styles.clearBtn}`}
                  onClick={handleClearFilters}
                >
                  Очистить
                </button>
                <button
                  className={`${styles.filterBtn} ${styles.applyBtn}`}
                  onClick={handleApplyFilters}
                >
                  Показать результаты
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.catalogBlock}>
        {displayedPaintings.map((element) => (
          <div key={element.id} className={styles.paintingCard}>
            <div className={styles.paintingImgContainer}>
              <img
                src={`https://test-front.framework.team${element.imageUrl}`}
                alt={element.name}
                className={styles.paintingImage}
              />
              <div className={styles.textBlock}>
                <div className={styles.textGroup1}>
                  <p className={styles.headingP}>{element.name}</p>
                  <p className={styles.underP}>{element.created}</p>
                </div>
                <div className={styles.textGroup2}>
                  <p className={styles.headingP}>{element.authorName}</p>
                  <p className={styles.underP}>{element.locationName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {actualTotalPages > 1 && (
        <div className={styles.paginationBlock}>
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className={styles.pageBtn}
          >
            <img src={theme === "light" ? arrowPrevLight : arrowPrevDark} alt="prev" />
          </button>

          <div className={styles.pagesNumbers}>
            {visiblePages.map((p, index) => (
              <div
                key={index}
                onClick={() => typeof p === "number" && goToPage(p)}
                className={`${styles.pageP} ${p === page ? styles.active : ""} ${
                  typeof p !== "number" ? styles.dots : ""
                }`}
              >
                {p}
              </div>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={page === actualTotalPages}
            className={styles.pageBtn}
          >
            <img src={theme === "light" ? arrowNextLight : arrowNextDark} alt="next" />
          </button>
        </div>
      )}
    </>
  );
};

export default Catalog;