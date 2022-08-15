import {configureStore} from "@reduxjs/toolkit"

import authReducer  from "../../features/auth/authSlice"
import articlesReducer from "../../features/articles/articlesSlice"
import departamentsReducer from "../../features/departaments/departamentsSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		articles: articlesReducer,
		departaments: departamentsReducer
	}
})

