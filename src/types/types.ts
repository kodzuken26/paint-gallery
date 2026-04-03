export interface Painting {
  id: number;
  name: string;
  authorId: number;
  locationId: number;
  created: number;
  imageUrl: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  location: string;
}

export interface PaintingWithDetails extends Painting {
  authorName: string;
  locationName: string;
}
