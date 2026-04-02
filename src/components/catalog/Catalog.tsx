import arrowPrevLight from "../../assets/images/arrow-prev-light.png";
import arrowPrevDark from "../../assets/images/arrow-prev-dark.png";
import arrowNextLight from "../../assets/images/arrow-next-light.png";
import arrowNextDark from "../../assets/images/arrow-next-dark.png";
import searchImage from "../../assets/images/search_icon.png";
import crossImage from "../../assets/images/cross_mini.png";

import { useMemo, useState, type FC } from "react";
import "./catalog.scss";
import {
  useGetPaintsQuery,
  useGetAuthorsQuery,
  useGetLocationsQuery,
} from "../../store/paintApi";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Filters from "../filters/Filters";

const Catalog: FC = () => {
  const [page, setPage] = useState(1);
    const limit = 6;
    const totalPages = 6;

    const [filters, setFilters] = useState({
        authorId: '' as number | '',
        locationId: '' as number | '',
        yearFrom: '',
        yearTo: ''
    });

  const { data: paintings, isLoading: isLoadingPaintings } = useGetPaintsQuery({
    page,
    limit,
  });
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsQuery();
  const { data: locations, isLoading: isLoadingLocations } =
    useGetLocationsQuery();

  console.log("Paintings:", paintings);
  console.log("Authors:", authors);
  console.log("Locations:", locations);

  
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (paintings && paintings[0]) {
    console.log("First painting authorid:", paintings[0].authorId);
    console.log("First painting locationId:", paintings[0].locationId);
  }

  if (authors) {
    console.log(
      "Author IDs:",
      authors.map((a) => ({ id: a.id, name: a.name })),
    );
  }
  const paintingsWithDetails = useMemo(() => {
    if (!paintings || !authors || !locations) return [];

    const authorsMap = new Map(authors.map((a) => [a.id, a.name]));
    const locationsMap = new Map(locations.map((l) => [l.id, l.location]));

    return paintings.map((painting) => ({
      ...painting,
      authorName: authorsMap.get(painting.authorId) || "Unknown",
      locationName: locationsMap.get(painting.locationId) || "Unknown",
    }));
  }, [paintings, authors, locations]);

  if (isLoadingPaintings || isLoadingAuthors || isLoadingLocations) {
    return <div>Loading...</div>;
  }

    const getVisiblePages = () => {
        const delta = 2; // Сколько страниц показывать с каждой стороны от текущей
        const range: number[] = [];
        
        // Собираем страницы вокруг текущей (исключая первую и последнюю)
        for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
            range.push(i);
        }
        
        const result: (number | string)[] = [1];
        
        // Добавляем многоточие перед диапазоном, если нужно
        if (range[0] > 2) {
            result.push('...');
        }
        
        // Добавляем диапазон страниц
        result.push(...range);
        
        // Добавляем многоточие после диапазона, если нужно
        if (range[range.length - 1] < totalPages - 1) {
            result.push('...');
        }
        
        // Добавляем последнюю страницу
        if (totalPages > 1) {
            result.push(totalPages);
        }
        
        return result;
    };

    const visiblePages = getVisiblePages();
    

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        setPage(prev => Math.max(1, prev - 1));
    };

    const goToPage = (pageNum: number) => {
        setPage(pageNum);
    };

    const filteredPaintings = useMemo(() => {
        if (!paintings) return [];

        return paintings.filter(painting => {
            // Фильтр по автору
            if (filters.authorId && painting.authorId !== filters.authorId) {
                return false;
            }

            // Фильтр по локации
            if (filters.locationId && painting.locationId !== filters.locationId) {
                return false;
            }

            // Фильтр по году
            if (filters.yearFrom && painting.created < parseInt(filters.yearFrom)) {
                return false;
            }
            if (filters.yearTo && painting.created > parseInt(filters.yearTo)) {
                return false;
            }

            return true;
        });
    }, [paintings, filters]);

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            authorId: '',
            locationId: '',
            yearFrom: '',
            yearTo: ''
        });
    };


  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme } = context;
  return (
    <>
          <div className="catalog-block">
              
               <div className="menu">
                <div className="searchInput">
                    <img src={searchImage} alt="search" />
                    <input type="text" placeholder="Painting title" />
                    <img src={crossImage} alt="clean" />
                </div>
                
                <Filters
                    theme={theme}
                    authors={authors || []}
                    locations={locations || []}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                />
            </div>
        {paintingsWithDetails.map((element) => (
          <div key={element.id} className="painting-card">
            <div className="painting-img-container">
              <img
                src={`https://test-front.framework.team${element.imageUrl}`}
                alt={element.name}
                className="painting-image"
              />
              <div className="text-block">
                <div className="text-group1">
                  <p className="heading-p">{element.name}</p>
                  <p className="under-p">{element.created}</p>
                </div>
                <div className="text-group2">
                  <p className="heading-p">{element.authorName}</p>
                <p className="under-p">{element.locationName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

              
             
        
          </div>
          
           <div className="pagination-block">
                <button
                    onClick={goToPrevPage}
                    disabled={page === 1}
                    className="page-btn"
                >
                   <img src={theme === "light" ? arrowPrevLight : arrowPrevDark} />
                </button>

                <div className="pages-numbers">
                    {visiblePages.map((p, index) => (
                        <div
                            key={index}
                            onClick={() => typeof p === 'number' && goToPage(p)}
                            className={`page-p ${p === page ? 'active' : ''} ${typeof p !== 'number' ? 'dots' : ''}`}
                        >
                            {p}
                        </div>
                    ))}
                </div>

                <button
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                    className="page-btn"
                >
                    <img src={theme === "light" ? arrowNextLight : arrowNextDark} />
                </button>
            </div>
    </>
  );
};

export default Catalog;
