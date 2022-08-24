import { useContext } from "react"
import { useState } from "react"
import { AddSVGIcon, ChevronRightSVGIcon } from "react-md"
import { useDispatch, useSelector } from "react-redux"
import { getArticles } from "../../../features/articles/articlesSlice"
import { getArticle, reset } from "../../../features/article/articleSlice"
import { Context } from "../LeftMenu/Context"

const MiddleSection = ({ groups, departamentIndex }) => {
	const [scale, setScale] = useState(false)
	const [scaleArticle, setScaleArticle] = useState(false)
	const [scaleAddButton, setScaleAddButton] = useState(false)
	const [activeItemIndex, setActiveItemIndex] = useState()
	const [showArticles, setShowArticles, showModal, setShowModal] = useContext(Context)
	const dispatch = useDispatch()

	const { articles } = useSelector(state => state.articles)
	const { departaments } = useSelector(state => state.departaments)

	const handleAddButton = (type) => {

		switch (type) {
			case "group":
				setScale(true)
				
				setTimeout(() => setScale(false), 500)
				setTimeout(() => setShowModal(true), 100)
				break
			case "article":
				setScaleAddButton(true)
				setTimeout(() => setScaleAddButton(false), 500)
				break
		}
	}

	const handleClickGroup = (groupIndex) => {

		setShowArticles(true)
		const groupId = departaments[departamentIndex].groups[groupIndex].id
		const data = {
			groupId,
			departamentId: null
		}
		dispatch(getArticles(data))
	}

	const handleClickArticle = (articleIndex) => {
		setActiveItemIndex(articleIndex)
		setScaleArticle(true)

		const articleId = articles[articleIndex].articleId
		dispatch(getArticle(articleId)).then(() => {
			dispatch(reset())
		})

		setTimeout(() => setScaleArticle(false), 500)
	}

	return (

		<div className="p-6 w-1/2 " style={{ borderRightWidth: "1px" }}>
			<div>
				{!showArticles ?
					<div>
						<h4 className="fadeAnimation font-medium leading-tight text-2xl mt-0 mb-2 text-black">Группы</h4>
						<button onClick={() => handleAddButton("group")} className={`w-72 rounded-lg p-3 mt-10 mb-5  ${scale ? "button_click" : ""}`} style={{ backgroundColor: "#f6f6f6" }}>
							<div className="flex justify-between">
								<div>
									Добавить группу
								</div>
								<AddSVGIcon />
							</div>
						</button>
						<button onClick={() => handleAddButton("article")} className={`w-72 rounded-lg p-3  mb-5  ${scaleAddButton ? "button_click" : ""}`} style={{ backgroundColor: "#f6f6f6" }}>
							<div className="flex justify-between">
								<div>
									Добавить статью
								</div>
								<AddSVGIcon />
							</div>
						</button>
						{groups?.map((group, i) => (
							<div onClick={() => handleClickGroup(i)} key={group.id} className="fadeAnimation flex">
								<div className={`w-72 mt-2 rounded-lg p-3 cursor-pointer list_hover_whiteBG  flex justify-between `}>
									<div>
										{group.name}</div>
									<ChevronRightSVGIcon />
								</div>
							</div>
						))}
						<div className="mt-10">
							{articles ? <div className="overflow-y-scroll fadeAnimation" style={{ maxHeight: "610px" }}>
								{articles.map((article, i) => (
									<div onClick={() => handleClickArticle(i)} key={article.articleId} className={`p-3 flex flex-col cursor-pointer mb-2 rounded-lg list_hover_whiteBG ${scaleArticle && activeItemIndex === i ? "button_click" : ""}`} >
										<div className="text-lg font-bold">{article.title}</div>
										<div className="truncate">{article.description}</div>
									</div>
								))}
							</div> : null}
						</div>

					</div>
					:
					showArticles && articles ?
						<div>
							<h4 className="fadeAnimation font-medium leading-tight text-2xl mt-0 mb-2 text-black">Статьи</h4>
							<button onClick={() => handleAddButton("article")} className={`w-72 rounded-lg p-3 mt-10 mb-5  ${scaleAddButton ? "button_click" : ""}`} style={{ backgroundColor: "#f6f6f6" }}>
								<div className="flex justify-between">
									<div>
										Добавить статью
									</div>
									<AddSVGIcon />
								</div>
							</button>
							<div className="overflow-y-scroll fadeAnimation" style={{ maxHeight: "610px" }}>
								{articles.map((article, i) => (
									<div onClick={() => handleClickArticle(i)} key={article.articleId} className={`p-3 flex flex-col cursor-pointer mb-2 rounded-lg list_hover_whiteBG ${scaleArticle && activeItemIndex === i ? "button_click" : ""}`} >
										<div className="text-lg font-bold" >{article.title}</div>
										<div className="truncate">{article.description}</div>
									</div>
								))}
							</div>

						</div>
						:
						<div>ничего</div>
				}
				{activeItemIndex ? <div></div> : <div></div>}
			</div>
		</div>
	)
}

export default MiddleSection