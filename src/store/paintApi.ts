import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosQuery";
import type { Painting, Author, Location } from "../types/types";

export interface GetPaintsParams {
  page: number;
  limit: number;
  q?: string;
  authorId?: number;
  locationId?: number;
  yearFrom?: string;
  yearTo?: string;
}

export const paintApi = createApi({
  reducerPath: "paintApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://test-front.framework.team/" }),
  tagTypes: ["Paintings", "Authors", "Locations"],
  endpoints: (build) => ({
    getPaints: build.query<Painting[], GetPaintsParams>({
      query: ({ page, limit, q, authorId, locationId, yearFrom, yearTo }) => {
        const params: Record<string, any> = {
          _page: page,
          _limit: limit,
        };

        if (q) {
          params.q = q;
        }

        if (authorId) {
          params.authorId = authorId;
        }

        if (locationId) {
          params.locationId = locationId;
        }

        if (yearFrom) {
          params.created_gte = yearFrom;
        }
        if (yearTo) {
          params.created_lte = yearTo;
        }

        return {
          url: "paintings",
          method: "GET",
          params,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Paintings" as const, id })),
              { type: "Paintings", id: "LIST" },
            ]
          : [{ type: "Paintings", id: "LIST" }],
    }),

    getAuthors: build.query<Author[], void>({
      query: () => ({ url: "authors" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Authors" as const, id })),
              { type: "Authors", id: "LIST" },
            ]
          : [{ type: "Authors", id: "LIST" }],
    }),

    getLocations: build.query<Location[], void>({
      query: () => ({ url: "locations" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Locations" as const, id })),
              { type: "Locations", id: "LIST" },
            ]
          : [{ type: "Locations", id: "LIST" }],
    }),
  }),
});

export const { useGetPaintsQuery, useGetAuthorsQuery, useGetLocationsQuery } =
  paintApi;
