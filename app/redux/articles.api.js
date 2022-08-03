import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesApi = createApi({
	reducerPath: 'articlesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.0.203:8787/',
		mode: 'cors'
	}),
	endpoints: (build) => ({
		getArticles: build.query({
			query: () => `get`
		}),
		addArticle: build.mutation({
			query: (body) => ({
				url: '/',
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(body)
			})
		}),
	}),

})

export const { useGetArticlesQuery, useAddArticleMutation } = articlesApi