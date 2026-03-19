import { useEffect, useState, type FC } from "react";
import type { IPaintings, IAuthors, ILocations } from "../types/types";
import axios from "axios";
import "./catalog.scss"

const API_PAINTINGS = 'https://test-front.framework.team/paintings'
const API_AUTHORS = 'https://test-front.framework.team/authors'
const API_LOCATIONS = 'https://test-front.framework.team/locations'

interface CatalogProps {
    initialPaintings?: IPaintings[];
    initialAuthors?: IAuthors[];
    initialLocations?: ILocations[];
}

const Catalog: FC<CatalogProps> = ({ initialPaintings = [], initialAuthors = [], initialLocations = [] }) => {
    const [paintings, setPaintings] = useState<IPaintings[]>(initialPaintings)
    const [authors, setAuthors] = useState<IAuthors[]>(initialAuthors)
    const [locations, setLocations] = useState<ILocations[]>(initialLocations)

    useEffect(() => {
        const fetchPaintings = async () => {
            const response = await axios.get<IPaintings[]>(API_PAINTINGS);
            setPaintings(response.data);
            const responseAuthor = await axios.get<IAuthors[]>(API_AUTHORS);
            setAuthors(responseAuthor.data);
            const responseLocation = await axios.get<ILocations[]>(API_LOCATIONS);
            setLocations(responseLocation.data)
        }
        fetchPaintings()
    }, [])

    return (
        <>
            <div className="catalog-block">
                {paintings.map(element => (
                    <div key={element.id} className="painting-card">
                        {/* <img src={`https://test-front.framework.team/${element.imgUrl}`} alt={element.name} /> */}
                        {/* <img src={"https://test-front.framework.team/" + element.imgUrl} alt={element.name} /> */}
                        <img src={`https://test-front.framework.team${element.imageUrl}`} alt={element.name} className="painting-image" />
                        <p>{element.authorid}</p>
                        <p>{element.name}</p>
                        <p>{element.created}</p>
                </div>
            ))}
            </div>
        </>
    )
}

export default Catalog;