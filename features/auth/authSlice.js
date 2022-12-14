import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

let user

//Get user from localStorage
if (typeof window !== 'undefined') {
	user = JSON.parse(localStorage.getItem('user'))
}

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		return await authService.register(user)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.msg) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

//Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.msg) || error.message || error
		return thunkAPI.rejectWithValue(message)
	}
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		},
		logout: (state) => {
			state.user = null
			if (typeof window !== "undefined") {
				localStorage.removeItem('user')
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
	}
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer
