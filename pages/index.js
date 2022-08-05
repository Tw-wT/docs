import Editor from '../app/components/Editor/Editor'
import { useEffect, useState } from "react"
import { createArticle, getArticles } from "../features/articles/articlesSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Home() {

  const dispatch = useDispatch()
  const { articles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.articles
  )
  const { user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    const articlesFromDB = dispatch(getArticles(user.access_token))
    console.log(articlesFromDB)
  }, [isSuccess])

  const onSaveHandler = async (blogData, title, description) => {
    const toSaveData = {
      title,
      blogData,
      description
    }

    const result = {
      article: toSaveData,
      access_token: user.access_token
    }

    // console.log(toSaveData)
    //make your ajax call to send the data to your server and save it in a database

    dispatch(createArticle(result))
  }

  return (

    <div>
      {/* {articleCreated && <div>Заметка создана</div>} */}
      <h1>Создать заметку</h1>
      <Editor
        onSave={(editorData, title, description) =>
          onSaveHandler(editorData, title, description)
        }
      />
    </div>
  )
}
