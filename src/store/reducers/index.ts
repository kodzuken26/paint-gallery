import { combineReducers } from "@reduxjs/toolkit";
import { paintingReducer } from "./paintingReduser";

export const rootReducer = combineReducers({
    painting: paintingReducer
})

export type RootState = ReturnType<typeof rootReducer>