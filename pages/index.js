import Editor from '../app/components/Editor/Editor'
import { useEffect } from "react"
import { getArticles } from "../features/articles/articlesSlice"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../app/components/Loader/Loader"
import { getDepartaments } from "../features/departaments/departamentsSlice"
import ArticlesList from "../app/components/ArticlesList/ArticlesList"
import LeftMenu from "../app/components/LeftMenu/LeftMenu"

export default function Home() {

  const dispatch = useDispatch()
  const { articles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.articles
  )

  const { user } = useSelector(
    (state) => state.auth
  )

  // console.log(user)

  useEffect(() => {
    dispatch(getDepartaments())
    dispatch(getArticles())
  }, [isSuccess])

  const onSaveHandler = async (blogData, title, description) => {
    const toSaveData = {
      title,
      blogData,
      description,
      group_id: 1
    }

    const result = {
      article: toSaveData
    }
  }

  return (
    <div className="flex">
      {isLoading && <Loader />}
      {/* <Editor
          onSave={(editorData, title, description) =>
            onSaveHandler(editorData, title, description)
          }
        /> */}
      <ArticlesList />

    </div>
  )
}
