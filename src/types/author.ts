export interface IAuthors {
  id: number;
  name: string;
}

export interface AuthorState {
  authors: IAuthors[];
    error: null | string;
    loading: boolean;
}

export enum AuthorActionTypes {
  FETCH_AUTHORS = "FETCH_AUTHORS",
  FETCH_AUTHORS_SUCCESS = "FETCH_AUTHORS_SUCCESS",
  FETCH_AUTHORS_ERROR = "FETCH_AUTHORS_ERROR",
}

interface FetchAuthorAction {
  type: AuthorActionTypes.FETCH_AUTHORS;
}

interface FetchAuthorSuccessAction {
  type: AuthorActionTypes.FETCH_AUTHORS_SUCCESS;
  payload: IAuthors[];
}

interface FetchAuthorErrorAction {
  type: AuthorActionTypes.FETCH_AUTHORS_ERROR;
  payload: string;
}

export type AuthorAction =
  | FetchAuthorAction
  | FetchAuthorErrorAction
  | FetchAuthorSuccessAction;
