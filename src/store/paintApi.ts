import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from './axiosQuery';
import type { Painting, Author, Location } from '../types/types';
// Типы данных

// interface CatalogProps {
//      initialPaintings?: IPaintings[];
//      initialAuthors?: IAuthors[];
//      initialLocations?: ILocations[];
//  }
    
    
// export interface IPainting {
//     id: number;
//     name: string;
//     authorid: number;
//     locationId: number;
//     created: number;
//     imageUrl: string;
// }

// export interface IAuthor {
//     id: number;
//     name: string;
// }

// export interface ILocation {
//     id: number;
//     location: string;
// }

export const paintApi = createApi({
    reducerPath: 'paintApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://test-front.framework.team/' }),
    tagTypes: ['Paintings', 'Authors', 'Locations'],
    endpoints: (build) => ({
        // Получение картин
        getPaints: build.query<Painting[], { page: number; limit: number }>({
            query: ({ page, limit }) => ({
                url: 'paintings',
                method: 'GET',
                params: { _page: page, _limit: limit }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Paintings' as const, id })),
                        { type: 'Paintings', id: 'LIST' },
                    ]
                    : [{ type: 'Paintings', id: 'LIST' }],
        }),
        
        // Получение авторов
        getAuthors: build.query<Author[], void>({
            query: () => ({ url: 'authors'}),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Authors' as const, id })),
                        { type: 'Authors', id: 'LIST' },
                    ]
                    : [{ type: 'Authors', id: 'LIST' }],
        }),
        
        // Получение локаций
        getLocations: build.query<Location[], void>({
            query: () => ({ url: 'locations' }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Locations' as const, id })),
                        { type: 'Locations', id: 'LIST' },
                    ]
                    : [{ type: 'Locations', id: 'LIST' }],
        }),
    }),
});


export const {
    useGetPaintsQuery,   
    useGetAuthorsQuery,   
    useGetLocationsQuery, 
} = paintApi;

