import { PaintingActionTypes, type PaintingAction, type PaintingState } from "../../types/painting";

const initialState: PaintingState = {
    paintings: [],
    page: 1,
    error: null,
    limit: 6,
    loading: false
}

export const paintingReducer = (state = initialState, action: PaintingAction): PaintingState => {
    switch (action.type) {
        case PaintingActionTypes.FETCH_PAINTINGS:
            return { ...state, loading: true }
        case PaintingActionTypes.FETCH_PAINTINGS_SUCCESS:
            return { ...state, loading: false, paintings: action.payload }
        case PaintingActionTypes.FETCH_PAINTINGS_ERROR:
            return { ...state, loading: false, error: action.payload }
        case PaintingActionTypes.SET_PAINTING_PAGE:
            return { ...state, page: action.payload }
        default:
            return state
    }
}