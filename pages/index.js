import Editor from '../app/components/Editor/Editor'
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

    console.log(result)
  }

  return (
    <>
      <LeftMenu />

      {/* <Editor
          onSave={(editorData, title, description) =>
            onSaveHandler(editorData, title, description)
          }
        /> */}

      <Editor
        onSave={(editorData, title, description) => 
          onSaveHandler(editorData, title, description)
        }
      />

    </>
  )
}
