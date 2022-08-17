import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import departamentsService from "./departamentService"

const initialState = {
	departaments: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

export const getDepartaments = createAsyncThunk('departaments', async ( thunkAPI) => {
	try {
		return await departamentsService.get()
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

export const departamentsSlice = createSlice({
	name: 'departaments',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		},
		clearData: (state) => {
			state.isLoading = false
			state.isSuccess = true
			state.departaments = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDepartaments.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getDepartaments.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.departaments = action.payload
			})
			.addCase(getDepartaments.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset, clearData } = departamentsSlice.actions
export default departamentsSlice.reducer