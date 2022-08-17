import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { getArticle, reset } from "../../features/articles/articlesSlice"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Editor from '../../app/components/Editor/Editor'


const Article = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [blogData, setBlogData] = useState({})
	const { article, isLoading, isSuccess, isError } = useSelector((state) => state.articles)

	const { id } = router.query
	// console.log(article.blogData.blocks)
	useEffect(() => {
		if (id) {
			dispatch(getArticle(id))
			dispatch(reset())
		}
	}, [id])

	useEffect(() => {
		setBlogData(article?.blogData)
	}, [isSuccess])

	return (
		<>
			{isLoading && <div>Loading...</div>}
			<div>
				{blogData && <Editor blogData={blogData} />}
			</div>
		</>
	)
}

export default Article