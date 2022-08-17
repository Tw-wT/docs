import Editor from '../app/components/Editor/Editor'
import ArticlesList from "../app/components/ArticlesList/ArticlesList"
import LeftMenu from "../app/components/LeftMenu/LeftMenu"

export default function Home() {

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
    <>
      <LeftMenu />
      <div className="flex">
        {/* <Editor
          onSave={(editorData, title, description) =>
            onSaveHandler(editorData, title, description)
          }
        /> */}
        <div>
          <ArticlesList />
        </div>
      </div>
    </>
  )
}
