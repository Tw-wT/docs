import Link from "next/link"
import { useSelector } from "react-redux"

const ArticlesList = () => {

	const { articles } = useSelector(
		(state) => state.articles
	)

	return (
		<div className="flex flex-row flex-wrap">
			{articles && articles.map(article => (
				<div className="flex justify-center mr-8 mb-6">
					<div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
						<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{article.title}</h5>
						<p className="text-gray-700 text-base mb-4">
							{article.description}
						</p>
						<Link href={"#"}><button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Подробнее</button></Link>
					</div>
				</div>
			))}
		</div>
	)
}

export default ArticlesList