// // store/index.ts
// import { configureStore } from '@reduxjs/toolkit';
import { paintApi } from './paintApi';

import { configureStore } from '@reduxjs/toolkit';

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Игнорируем проверку сериализации для axios ошибок
//         ignoredActions: ['api/executeMutation/rejected'],
//         ignoredPaths: ['api.error'],
//       },
//     }).concat(api.middleware),
// });



export * from './axiosQuery';
export * from './paintApi';

export const store = configureStore({
       reducer: {
     [paintApi.reducerPath]: paintApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: {
         ignoredActions: ['api/executeMutation/rejected'],
         ignoredPaths: ['api.error'],
       },
     }).concat(paintApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;