export interface IPaintings {
  authorid: number;
  created: number;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface PaintingState {
  paintings: IPaintings[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export enum PaintingActionTypes {
  FETCH_PAINTINGS = "FETCH_PAINTINGS",
  FETCH_PAINTINGS_SUCCESS = "FETCH_PAINTINGS_SUCCESS",
  FETCH_PAINTINGS_ERROR = "FETCH_PAINTINGS_ERROR",
  SET_PAINTING_PAGE = "SET_PAINTING_PAGE",
}

interface FetchPaintingAction {
  type: PaintingActionTypes.FETCH_PAINTINGS;
}

interface FetchPaintingSuccessAction {
  type: PaintingActionTypes.FETCH_PAINTINGS_SUCCESS;
  payload: IPaintings[];
}

interface FetchPaintingErrorAction {
  type: PaintingActionTypes.FETCH_PAINTINGS_ERROR;
  payload: string;
}

interface SetPaintingPage {
  type: PaintingActionTypes.SET_PAINTING_PAGE;
  payload: number;
}

export type PaintingAction =
  | FetchPaintingAction
  | FetchPaintingErrorAction
  | FetchPaintingSuccessAction
  | SetPaintingPage;
