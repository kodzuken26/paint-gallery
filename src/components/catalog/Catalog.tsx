import { useEffect, useState, type FC } from "react";
import type { IPaintings } from "../types/types";
import axios from "axios";

const API_PAINTINGS = 'https://test-front.framework.team/paintings'

interface CatalogProps {
    initialPaintings?: IPaintings[];
}

const Catalog: FC<CatalogProps> = ({ initialPaintings = [] }) => {
    const [paintings, setPaintings] = useState<IPaintings[]>(initialPaintings)

    useEffect(() => {
        const fetchPaintings = async () => {
            const response = await axios.get<IPaintings[]>(API_PAINTINGS);
            setPaintings(response.data);
        }
        fetchPaintings()
    }, [])
    return (
        <>
            <div className="catalog-block">
                {paintings.map(element => (
                    <div key={element.id} className="painting-card">
                        <img src={element.imgUrl} alt={element.name} />
                        <p>{element.name}</p>
                </div>
            ))}
            </div>
        </>
    )
}

export default Catalog;