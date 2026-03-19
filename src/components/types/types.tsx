export interface IPaintings{
    authorid: number;
    created: number;
    id: number;
    imageUrl: "string";
    locationId: number;
    name: string;
}

export interface IAuthors{
    id: number;
    name: string;
}

export interface ILocations{
    id: number;
    location: string;
}