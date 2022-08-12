import Editor from '../app/components/Editor/Editor'
import { useEffect, useState } from "react"
import { createArticle, getArticles, getGroups } from "../features/articles/articlesSlice"
import { useSelector, useDispatch } from "react-redux"
import { reset, logout } from "../features/auth/authSlice"
import Loader from "../app/components/Loader/Loader"
import { getDepartaments } from "../features/departaments/departamentsSlice"
import LeftMenu from "../app/components/LeftMenu/LeftMenu"


export default function Home() {

  const dispatch = useDispatch()
  const { articles, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.articles
  )

  const { user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    const data = {
      token: user?.access_token,
      departament_id: 1
    }
    dispatch(getGroups(data))
    dispatch(getDepartaments(user?.access_token))
    dispatch(getArticles(user?.access_token))
  }, [isSuccess])

  const onSaveHandler = async (blogData, title, description) => {
    const toSaveData = {
      title,
      blogData,
      description,
      group_id: 1
    }

    const result = {
      article: toSaveData,
      access_token: user.access_token
    }

    let test = dispatch(createArticle(result))
    test.then(res => {
      console.log(res)
      if (res.payload.error && res.payload.statusCode === 401) {
        dispatch(logout())
        dispatch(reset())
      }

    })
  }

  return (
    <div>

      {isLoading && <Loader />}
      <div className="flex">
        <div className="w-1/4">
          <LeftMenu />
        </div>
        <Editor
          onSave={(editorData, title, description) =>
            onSaveHandler(editorData, title, description)
          }
        />
      </div>


    </div>
  )
}
