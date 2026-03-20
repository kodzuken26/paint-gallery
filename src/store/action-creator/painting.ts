import type { Dispatch } from "@reduxjs/toolkit"
import { PaintingActionTypes, type PaintingAction } from "../../types/painting"
import axios from "axios"

export const fetchPaintings = (page = 1, limit = 6) => {
    return async (dispatch: Dispatch<PaintingAction>) => {
        try {
            dispatch({ type: PaintingActionTypes.FETCH_PAINTINGS })
            const response = await axios.get('https://test-front.framework.team/paintings', {
                params: {_page: page, _limit: limit}
            })
            setTimeout(() => {
                dispatch({type: PaintingActionTypes.FETCH_PAINTINGS_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            dispatch({
                type: PaintingActionTypes.FETCH_PAINTINGS_ERROR,
                payload: 'Произошла ошибка при загрузке картин'
            })
        }
    }
}

export function SetPaintingPage(page: number): PaintingAction {
    return {type: PaintingActionTypes.SET_PAINTING_PAGE, payload: page}
}