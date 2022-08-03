import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.0.203:8787/',
		mode: 'cors'
	}),
	endpoints: (build) => ({
		login: build.mutation({
			query: (body) => ({
				url: 'login',
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				}
			})
		}),
		register: build.mutation({
			query: (body) => ({
				url: 'registration',
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				}
			})
		})
	})
})

export const { useLoginMutation, useRegisterMutation } = authApi