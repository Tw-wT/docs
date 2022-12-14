import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import articleService from "./articleService"


const initialState = {
	article: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

export const getArticle = createAsyncThunk('article', async (id, thunkAPI) => {
	try {
		return await articleService.getArticle(id)
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

export const deleteArticle = createAsyncThunk('delete-article', async (id, thunkAPI) => {
	try {
		return await articleService.deleteArticle(id)
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

export const editArticleById = createAsyncThunk('edit-article', async (data, thunkAPI) => {
	try {
		return await articleService.editArticleById(data.id, data.article)
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

export const articleSlice = createSlice({
	name: "article",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ""
		},
		clear: (state) => {
			state.article = null
		}
	},
	extraReducers: (builder) => {
		builder
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
			.addCase(deleteArticle.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteArticle.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
				state.article = null
			})
			.addCase(deleteArticle.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(editArticleById.pending, (state) => {
				state.isLoading = true
			})
			.addCase(editArticleById.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.article = action.payload
			})
			.addCase(editArticleById.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset, clear } = articleSlice.actions
export default articleSlice.reducer