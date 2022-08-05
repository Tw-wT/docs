import Editor from '../app/components/Editor/Editor'
import { useState } from "react"
import { createArticle } from "../features/articles/articlesSlice"
import { useSelector, useDispatch } from "react-redux"

export default function Home() {

  const dispatch = useDispatch()
  const { user, articles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.articles
  )

  // const [articleCreated, createArticle] = useState()

  if (isLoading) return <h1>Loading</h1>

  const onSaveHandler = async (blogData, title, description) => {

    const toSaveData = {
      title,
      blogData,
      description,
    }

    // console.log(toSaveData)
    //make your ajax call to send the data to your server and save it in a database

    dispatch(createArticle(toSaveData))
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
