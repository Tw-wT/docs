import Head from 'next/head'
import Editor from '../../app/components/Editor/Editor'
import { useGetArticlesQuery, useAddArticleMutation } from '../../app/redux'
import { useState } from "react"
import { Button } from "react-md"


const CreateBlog = (props) => {

  // const { isLoading, data, error } = useGetArticlesQuery()

  const [addArticle, { isError }] = useAddArticleMutation()

  const [articleCreated, createArticle] = useState()

  // if (isLoading) return <h1>Loading</h1>

  const onSaveHandler = async (blogData, title, description) => {

    const toSaveData = {
      title,
      blogData,
      description,
    }

    await addArticle(toSaveData).unwrap().then((response) => {
      console.log(response)
      if (response.result === 'success') {
        createArticle(true)
      }
    })


    // console.log(toSaveData)
    //make your ajax call to send the data to your server and save it in a database
  }

  return (

    <div>
      {articleCreated && <div>Заметка создана</div>}
      <h1>Создать заметку</h1>
      <Editor
        onSave={(editorData, title, description) =>
          onSaveHandler(editorData, title, description)
        }
      />
    </div>
  )
}

export default CreateBlog
