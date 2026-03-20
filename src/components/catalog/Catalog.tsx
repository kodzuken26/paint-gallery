import { useEffect, useState, type FC } from "react";
import type { IPaintings } from "../../types/painting";
import "./catalog.scss";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

// const API_PAINTINGS = 'https://test-front.framework.team/paintings'
// const API_AUTHORS = 'https://test-front.framework.team/authors'
// const API_LOCATIONS = 'https://test-front.framework.team/locations'

// interface CatalogProps {
//     initialPaintings?: IPaintings[];
//     initialAuthors?: IAuthors[];
//     initialLocations?: ILocations[];
// }

const Catalog: React.FC = () => {
  const { page, error, loading, paintings, limit } = useTypedSelector(
    (state) => state.painting,
  ); // называется деструктуризация
  const { fetchPaintings, SetPaintingPage } = useActions();
  const pages = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    fetchPaintings(page, limit);
  }, [page]);

  if (loading) {
    return <h1>Картины загружаются</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  // const [paintings, setPaintings] = useState<IPaintings[]>(initialPaintings)
  // const [authors, setAuthors] = useState<IAuthors[]>(initialAuthors)
  // const [locations, setLocations] = useState<ILocations[]>(initialLocations)

  // useEffect(() => {
  //     const fetchPaintings = async () => {
  //         const response = await axios.get<IPaintings[]>(API_PAINTINGS);
  //         setPaintings(response.data);
  //         const responseAuthor = await axios.get<IAuthors[]>(API_AUTHORS);
  //         setAuthors(responseAuthor.data);
  //         const responseLocation = await axios.get<ILocations[]>(API_LOCATIONS);
  //         setLocations(responseLocation.data)
  //     }
  //     fetchPaintings()
  // }, [])

  return (
    <>
      <div className="catalog-block">
        {paintings.map((element) => (
          <div key={element.id} className="painting-card">
            <img
              src={`https://test-front.framework.team${element.imageUrl}`}
              alt={element.name}
              className="painting-image"
            />
            <p>{element.authorid}</p>
            <p>{element.name}</p>
            <p>{element.created}</p>
          </div>
        ))}

        <div style={{ display: "flex" }}>
          {pages.map((p) => (
            <div
              style={{
                border: p === page ? "2px solid green" : "1px solid gray",
                padding: 10,
              }}
              onClick={() => SetPaintingPage(p)}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalog;
