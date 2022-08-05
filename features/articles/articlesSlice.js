import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import articlesService from "./articlesService"




const initialState = {
	articles: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

export const createArticle = createAsyncThunk('articles/create', async (data, thunkAPI) => {
	try {
		return await articlesService.create(data.article, data.access_token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

export const getArticles = createAsyncThunk('articles', async (token) => {
	try {
		return await articlesService.getArticles(token)
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(createArticle.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createArticle.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.articles = action.payload
			})
			.addCase(createArticle.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.articles = null
			})
	}
})

export const { reset } = articlesSlice.actions
export default articlesSlice.reducer