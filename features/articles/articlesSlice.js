import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import articlesService from "./articlesService"

const initialState = {
	articles: null,
	article: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* Создать запись
export const createArticle = createAsyncThunk('articles/create', async (data, thunkAPI) => {
	try {
		return await articlesService.create(data.article)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error
		const statusCode = error.response.status
		const res = {
			error: true,
			message,
			statusCode
		}
		return thunkAPI.rejectWithValue(res)
	}
})

//* Получить записи по группе или по отедлу (один из параметров всегда null)
export const getArticles = createAsyncThunk('articles', async (data, thunkAPI) => {
	try {
		return await articlesService.getArticles(data.groupId, data.departamentId)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

//* Получить запись по id
export const getArticle = createAsyncThunk('article', async (id, thunkAPI) => {
	try {
		return await articlesService.getArticle(id)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

export const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		},
		clearData: (state) => {
			state.article = null,
			state.articles = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createArticle.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createArticle.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createArticle.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.articles = null
			})
			.addCase(getArticles.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getArticles.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.articles = action.payload 
			})
			.addCase(getArticles.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.articles = null
			})
			.addCase(getArticle.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getArticle.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.article = action.payload
			})
			.addCase(getArticle.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset, clearData } = articlesSlice.actions
export default articlesSlice.reducer