import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import articlesService from "./articlesService"

const initialState = {
	articles: null,
	groups: null,
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
		const statusCode = error.response.status
		const res = {
			error: true,
			message,
			statusCode
		}
		return thunkAPI.rejectWithValue(res)
	}
})

export const getArticles = createAsyncThunk('articles', async (token, thunkAPI) => {
	try {
		return await articlesService.getArticles(token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

export const getGroups = createAsyncThunk('articles/groups', async (data, thunkAPI) => {
	try {
		return await articlesService.getGroups(data.token, data.departament_id)
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
				console.log(action)
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.articles = null
			})
			.addCase(getGroups.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getGroups.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.groups = action.payload
			})
			.addCase(getGroups.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset } = articlesSlice.actions
export default articlesSlice.reducer