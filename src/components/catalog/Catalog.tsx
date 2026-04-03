import arrowPrevLight from "../../assets/images/arrow-prev-light.png";
import arrowPrevDark from "../../assets/images/arrow-prev-dark.png";
import arrowNextLight from "../../assets/images/arrow-next-light.png";
import arrowNextDark from "../../assets/images/arrow-next-dark.png";
import searchImage from "../../assets/images/search_icon.png";
import crossImageDark from "../../assets/images/cross_dark.png";
import crossImageLight from "../../assets/images/close_light.png";
import filterLightImage from "../../assets/images/filters_btn_light.png";
import filterDarkImage from "../../assets/images/filters_btn_dark.png";
import plusImageLight from "../../assets/images/plus_icon_light.png";
import minusImageLight from "../../assets/images/minus_icon_light.png";
import plusImageDark from "../../assets/images/plus_icon_dark.png";
import minusImageDark from "../../assets/images/minus_icon_dark.png";

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


  const { 
    data: paintings = [], 
    isLoading: isLoadingPaintings,
    isFetching: isFetchingPaintings,
  } = useGetPaintsQuery({
    page,
    limit,
    q: searchQuery || undefined,
    authorId: filters.authorId || undefined,
    locationId: filters.locationId || undefined,
    yearFrom: filters.yearFrom || undefined,
    yearTo: filters.yearTo || undefined,
  });

  const { data: authors = [], isLoading: isLoadingAuthors } = useGetAuthorsQuery();
  const { data: locations = [], isLoading: isLoadingLocations } = useGetLocationsQuery();

  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  const paintingsWithDetails = useMemo(() => {
    if (!paintings.length || !authors.length || !locations.length) return [];

    const authorsMap = new Map(authors.map((a) => [a.id, a.name]));
    const locationsMap = new Map(locations.map((l) => [l.id, l.location]));

    return paintings.map((painting) => ({
      ...painting,
      authorName: authorsMap.get(painting.authorId) || "Unknown",
      locationName: locationsMap.get(painting.locationId) || "Unknown",
    }));
  }, [paintings, authors, locations]);

  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  const handleApplyFilters = () => {
    setIsFiltersOpen(false);
    setPage(1);
  };

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

  const totalPages = 6;
  const actualTotalPages = totalPages;

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

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filters]);

  const isLoading = isLoadingPaintings || isLoadingAuthors || isLoadingLocations;

  if (isLoading) {
    return <div className={styles.loadingTitle}>Loading...</div>;
  }

  if (paintingsWithDetails.length === 0) {
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
                src={crossImageLight}
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
          <p className={styles.p1}>
            No matches for <b>{searchQuery || "paintings"}</b>
          </p>
          <p className={styles.p2}>
            Please try again with a different spelling of keywords
          </p>
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
              src={crossImageLight}
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

      {isFetchingPaintings && (
        <div className={styles.loadingTitle}>Updating...</div>
      )}

      {isFiltersOpen && (
        <div
          className={styles.filterOverlay}
          onClick={() => setIsFiltersOpen(false)}
        >
          <div
            className={styles.filterPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.filterHeader}>
              <img
                src={theme === "light" ? crossImageLight : crossImageDark}
                alt="close"
                className={styles.filterClose}
                onClick={() => setIsFiltersOpen(false)}
              />
            </div>

            <div className={styles.filterContent}>
              <div className={styles.filterGroup}>
                <div
                  className={styles.filterHeaderGroup}
                  onClick={() => setIsAuthorFilterOpen(!isAuthorFilterOpen)}
                >
                  <label className={styles.filterLabel}>Artist</label>
                  <img
                    src={
                      isAuthorFilterOpen
                        ? theme === "light"
                          ? minusImageLight
                          : minusImageDark
                        : theme === "light"
                          ? plusImageLight
                          : plusImageDark
                    }
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
                          ? authors?.find((a) => a.id === filters.authorId)
                              ?.name
                          : "Select the artist"}
                      </span>
                      <span className={styles.arrow}>
                        {isAuthorOpen ? "▲" : "▼"}
                      </span>
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
                          All authors
                        </div>
                        {authors?.map((author) => (
                          <div
                            key={author.id}
                            className={`${styles.selectItem} ${
                              filters.authorId === author.id
                                ? styles.active
                                : ""
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

              <div className={styles.filterGroup}>
                <div
                  className={styles.filterHeaderGroup}
                  onClick={() => setIsLocationFilterOpen(!isLocationFilterOpen)}
                >
                  <label className={styles.filterLabel}>Location</label>
                  <img
                    src={
                      isLocationFilterOpen
                        ? theme === "light"
                          ? minusImageLight
                          : minusImageDark
                        : theme === "light"
                          ? plusImageLight
                          : plusImageDark
                    }
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
                          ? locations?.find((l) => l.id === filters.locationId)
                              ?.location
                          : "Select the location"}
                      </span>
                      <span className={styles.arrow}>
                        {isLocationOpen ? "▲" : "▼"}
                      </span>
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
                          All locations
                        </div>
                        {locations?.map((location) => (
                          <div
                            key={location.id}
                            className={`${styles.selectItem} ${
                              filters.locationId === location.id
                                ? styles.active
                                : ""
                            }`}
                            onClick={() => {
                              setFilters({
                                ...filters,
                                locationId: location.id,
                              });
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

              <div className={styles.filterGroup}>
                <div
                  className={styles.filterHeaderGroup}
                  onClick={() => setIsYearFilterOpen(!isYearFilterOpen)}
                >
                  <label className={styles.filterLabel}>Years</label>
                  <img
                    src={
                      isYearFilterOpen
                        ? theme === "light"
                          ? minusImageLight
                          : minusImageDark
                        : theme === "light"
                          ? plusImageLight
                          : plusImageDark
                    }
                    alt={isYearFilterOpen ? "minus" : "plus"}
                    className={styles.filterToggle}
                  />
                </div>

                {isYearFilterOpen && (
                  <div className={styles.yearInputs}>
                    <input
                      type="number"
                      placeholder="From"
                      value={filters.yearFrom}
                      onChange={(e) =>
                        setFilters({ ...filters, yearFrom: e.target.value })
                      }
                      className={styles.yearInput}
                    />
                    <span className={styles.yearSeparator}>—</span>
                    <input
                      type="number"
                      placeholder="To"
                      value={filters.yearTo}
                      onChange={(e) =>
                        setFilters({ ...filters, yearTo: e.target.value })
                      }
                      className={styles.yearInput}
                    />
                  </div>
                )}
              </div>

              <div className={styles.filterButtons}>
                <p
                  className={`${styles.filterBtn} ${styles.applyBtn}`}
                  onClick={handleApplyFilters}
                >
                  SHOW THE RESULTS
                </p>
                <p
                  className={`${styles.filterBtn} ${styles.clearBtn}`}
                  onClick={handleClearFilters}
                >
                  CLEAR
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.catalogBlock}>
        {paintingsWithDetails.map((element) => (
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
                <div className={styles.arrowRight}>
                  <p className={styles.arrow}>→</p>
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
            <img
              src={theme === "light" ? arrowPrevLight : arrowPrevDark}
              alt="prev"
            />
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
            <img
              src={theme === "light" ? arrowNextLight : arrowNextDark}
              alt="next"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default Catalog;