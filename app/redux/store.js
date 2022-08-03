import {configureStore} from "@reduxjs/toolkit"
import { articlesApi } from "./articles.api"
import { authApi } from "./auth.api"

export const store = configureStore({
	reducer: {
		[articlesApi.reducerPath]: articlesApi.reducer,
		[authApi.reducerPath]: authApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([articlesApi.middleware, authApi.middleware])
})