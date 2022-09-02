import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	black: false,
	white: true
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setWhiteTheme: (state) => {
			state.black = false
			state.white =true
		},
		setBlackTheme: (state) => {
			state.black = true
			state.white = false
		}
	}
})

export const {setBlackTheme, setWhiteTheme} = themeSlice.actions
export default themeSlice.reducer