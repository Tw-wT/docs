import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import departamentsService from "./departamentService"

const initialState = {
	departaments: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//* Получить список департаментов
export const getDepartaments = createAsyncThunk('departaments', async (args, thunkAPI) => {
	try {
		return await departamentsService.get()
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.msg) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

//* Создание группы
export const createGroup = createAsyncThunk('group-article', async (groupData, thunkAPI) => {
	try {
		return await departamentsService.createGroup(groupData)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.msg) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

//* Изменение группы
export const changeGroup = createAsyncThunk('group-article/edit', async (res, thunkAPI) => {
	try {
		return await departamentsService.changeGroup(res.id, res.data)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.msg) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

export const deleteGroup = createAsyncThunk('group-article/delete', async(id, thunkAPI) => {
	try {
		return await departamentsService.deleteGroup(id)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.msg) || error.message || error
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
			state.isSuccess = false
			state.isError = false
			state.message = ''
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
			.addCase(createGroup.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createGroup.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(changeGroup.pending, (state) => {
				state.isLoading = true
			})
			.addCase(changeGroup.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(changeGroup.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deleteGroup.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteGroup.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(deleteGroup.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset, clearData } = departamentsSlice.actions
export default departamentsSlice.reducer