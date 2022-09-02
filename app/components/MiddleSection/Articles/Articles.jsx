import { useContext, useState } from "react"
import { Toaster } from "react-hot-toast"
import { AddSVGIcon } from "react-md"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getArticle, reset } from "../../../../features/article/articleSlice"
import Button from "../../../UI/Button"
import Title from "../../../UI/Title"
import { Context } from "../../MainWrapper/Context"


const Articles = ({ }) => {
	const [activeArticleIndex, setActiveArticleIndex] = useState()
	const [scaleArticle, setScaleArticle] = useState(false)

	const { editorContext } = useContext(Context)
	const [modeCreate, setModeCreate] = editorContext

	const { articles, isLoading } = useSelector(state => state.articles)
	const { article } = useSelector(state => state.article)
	const dispatch = useDispatch()

	const handleClickArticle = (articleIndex) => {
		setScaleArticle(true)
		setActiveArticleIndex(articleIndex)

		const articleId = articles[articleIndex].articleId
		if (article?.id !== articleId) {
			dispatch(getArticle(articleId)).then(() => {
				setModeCreate(false)

				dispatch(reset())
			})
		} else {
			toast.info("У вас уже открыта выбранная запись")
		}

		setTimeout(() => setScaleArticle(false), 500)
	}
	return (
		<>
			<Toaster />
			<Title text="Записи" />
			<Button onClickHandler={() => setModeCreate(true)} text="Добавить запись" rightIcon={<AddSVGIcon />} />
			<div className="overflow-y-scroll fadeAnimation mt-5" style={{ maxHeight: "35%" }} >
				{
					!isLoading ?
						articles ?
							articles.map((article, i) => (
								<div onClick={() => handleClickArticle(i)} key={article.articleId} className={`p-3 flex flex-col cursor-pointer mb-2 rounded-lg fadeAnimation list_hover_whiteBG ${scaleArticle && activeArticleIndex === i ? "button_click" : ""}`} >
									<div className="text-lg font-bold">{article.title}</div>
									<div className="truncate">{article.description}</div>
								</div>
							))
							: <span className="fadeAnimation">Записей пока нет</span>
						:
						<div className="w-full fadeAnimation rounded-lg mt-2 bg-white">
							<div className="animate-pulse items-center flex space-x-4">
								<div className="flex-1 items-center space-y-6 py-1">
									<div className="h-20 w-full rounded " style={{ backgroundColor: "rgb(215 215 215)" }}></div>
								</div>
							</div>
						</div>
				}
			</div>
		</>
	)
}

export default Articles