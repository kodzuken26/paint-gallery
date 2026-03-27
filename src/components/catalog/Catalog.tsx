import arrowPrevLight from "../../assets/images/arrow-prev-light.png";
import arrowPrevDark from "../../assets/images/arrow-prev-dark.png";
import arrowNextLight from "../../assets/images/arrow-next-light.png";
import arrowNextDark from "../../assets/images/arrow-next-dark.png";

import { useMemo, useState, type FC } from "react";
import "./catalog.scss";
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

  const totalPages = 6;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const goToPage = (pageNum: number) => {
    setPage(pageNum);
  };

  const context = useContext(ThemeContext);

  if (!context) return null;

  const { theme } = context;
  return (
    <>
      <div className="catalog-block">
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
              </div>
            </div>

            {/* <div className="text-group">
              <p className="heading-p">{element.name}</p>
              <p className="under-p">{element.created}</p>
            </div> */}
            <div className="text-group">
              <p className="heading-p">{element.authorName}</p>
              <p className="under-p">{element.locationName}</p>
            </div>
          </div>
        ))}

        <div className="pagination-block">
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className="page-btn"
          >
            <img src={theme === "light" ? arrowPrevLight : arrowPrevDark} />
          </button>

          <div className="pages-numbers">
            {pages.map((p) => (
              <div key={p} onClick={() => goToPage(p)} className="page-p">
                {p}
              </div>
            ))}
          </div>
          <button onClick={goToNextPage} className="page-btn">
            <img src={theme === "light" ? arrowNextLight : arrowNextDark} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Catalog;
