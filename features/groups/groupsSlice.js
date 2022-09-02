import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import groupsService from "./groupsService"

const initialState = {
	groups: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: ''
}

export const getGroupsByDepId = createAsyncThunk('group-by-id', async (id, thunkAPI) => {
	try {
		return await groupsService.getGroupsByDepId(id)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.msg) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

export const groupSlice = createSlice({
	name: 'groups',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ''
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getGroupsByDepId.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getGroupsByDepId.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.groups = action.payload
			})
			.addCase(getGroupsByDepId.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset } = groupSlice.actions
export default groupSlice.reducer