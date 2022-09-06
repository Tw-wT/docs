import { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useToggle } from "@react-md/utils"
import { AddSVGIcon, CancelSVGIcon, ChevronRightSVGIcon, DeleteSVGIcon, EditSVGIcon, MoreHorizSVGIcon, SaveSVGIcon } from "@react-md/material-icons"
import { useSelector } from "react-redux"
import { Context } from "../Context/Context"
import DropDownEditArticle from "../DropDownEdit/DropDownEditArticle/DropDownEditArticle"
import EditorSkeleton from "./EditorSkeleton"
import Button from "../../UI/Button"

const EditorJs = dynamic(() => import('react-editor-js'), { ssr: false })

let editorInstance

const Editor = (props) => {
    const { article, isSuccess, isLoading } = useSelector((state) => state.article)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editorTools, setEditorTools] = useState()
    const [loading, enable, disable] = useToggle(false)
    const [body, setBody] = useState({ ...article?.blogData })
    const [tags, setTags] = useState([])
    const { editorContext } = useContext(Context)
    const [modeCreate, setModeCreate, editArticle, setEditArticle] = editorContext
    const date = new Date(article?.blogData?.time).toLocaleDateString("ru-ru")
    const [readOnly, setReadOnly] = useState(true)
    const [addTagMode, setAddTagMode] = useState(false)
    const [tagInput, setTagInputValue] = useState("")

    useEffect(() => {
        if (!modeCreate) {
            if (body !== article?.blogData) {
                setBody(article?.blogData)
                setTags(article?.tags)
            }
        }

        setTitle(article ? article.title : "")
        setDescription(article ? article.description : "")

    }, [isSuccess])

    useEffect(() => {
        setTitle("")
        setDescription("")
    }, [])

    useEffect(() => {
        if (modeCreate) {
            setBody({})
            setTitle("")
            setTags([])
            setDescription("")
        }
        if (modeCreate || editArticle) {
            setReadOnly(false)
        } else {
            setReadOnly(true)
        }
    }, [modeCreate, editArticle])

    const onCancelHandler = () => {
        setTags(article?.tags)
        setModeCreate(false)
        setEditArticle(false)
    }

    const onChangeTagInput = (e) => {
        let value = e.target.value
        setTagInputValue(value)
    }

    const tagInputBlurEffect = () => {
        setAddTagMode(false)
        setTagInputValue("")
    }

    const onSaveHandler = async (editorInstance, type) => {
        enable()
        try {
            const blogData = await editorInstance.save()
            if (!title || title === '')
                throw new Error('Title cannot be empty. Please enter title')
            if (!blogData.blocks[0])
                throw new Error('Blog cannot be empty. Please enter some data')
            props.onSave(blogData, title, description, tags, type)
            disable()
        } catch (err) {
            console.log(err)
        }
    }


    let editorComponent
    if (!editorTools) editorComponent = 'Loading...'
    else {
        editorComponent = (
            <EditorJs
                i18n={{
                    messages: {
                        toolNames: {
                            "Text": "Текст",
                            "Table": "Таблица",
                            "Link": "Ссылка",
                            "Heading": "Заголовок",
                            "List": "Список",
                            "Warning": "Блок внимание",
                            "Code": "Код",
                            "Delimiter": "Разделитель",
                            "Image": "Изображение",
                            "Raw HTML": "HTML",
                            "Checklist": "Список чекбоксов"

                        },
                        "tools": {
                            "Warning": {
                                "Title": "Название",
                                "Message": "Сообщение"
                            },
                            "link": {
                                "Link": "Вставьте ссылку"
                            }
                        },
                        blockTunes: {
                            "delete": {
                                "Delete": "Удалить (нажмите 2 раза)"
                            },
                            "moveUp": {
                                "Move up": "Переместить вверх",
                            },
                            "moveDown": {
                                "Move down": "Переместить вниз"
                            }
                        },
                        ui: {
                            toolbar: {
                                toolbox: {
                                    "Add": "Добавить",
                                },
                                "Click to tune": "Нажмите, чтобы изменить"
                            },

                        }
                    }
                }}
                data={body?.time ? body : null}
                instanceRef={(instance) => (editorInstance = instance)}
                tools={editorTools}
                placeholder={`Давайте создадим какую-то запись!`}
                enableReInitialize={true}
                key={body?.time}
                readOnly={readOnly}
            />
        )
    }

    useEffect(() => {
        const importConstants = async () => {
            const tools = (await import('../../components/Editor/EditorConstants'))
                .default
            setEditorTools(tools)
        }

        importConstants()

        if (loading) {
            enable()
        }
    }, [loading])

    if (!modeCreate && !article && !isLoading) {
        return null
    }

    const onAddTagHandler = (e) => {
        e.preventDefault()
        setTags(prev => {
            return [
                ...prev,
                tagInput
            ]
        })
        setAddTagMode(false)
        setTagInputValue("")
    }

    const editTagHandler = (index) => {
        console.log(index)

    }

    const deleteTagHandler = (index) => {
        setTags(prev => {
            return prev.filter((el, i) => {
                return i != index
            })
        })
    }


    return (
        <>
            {isLoading ?
                <EditorSkeleton />
                :
                <div className="overflow-y-scroll p-8 w-3/5">
                    {body && <div>
                        <nav className="flex justify-between border-b-2 border-gray-200">
                            <div className="flex items-end mb-2">
                                <div className="fadeAnimation font-normal leading-tight text-2xl   text-black">Записи
                                </div>
                                <div><ChevronRightSVGIcon style={{ fill: "black", transform: "scale(1.2)" }} /></div>
                                <div className="fadeAnimation font-normal leading-tight text-2xl   text-black">
                                    {title?.length ? title : "Новая запись"}</div>
                            </div>
                            {!modeCreate && <DropDownEditArticle type="article" />}
                        </nav>
                        {modeCreate ?
                            <section className="p-4">
                                <div className="flex justify-between">
                                    <div className="flex flex-col w-2/3">
                                        <input
                                            className="fadeAnimation  outline-none font-medium leading-tight text-4xl text-black"
                                            style={{ border: "0px" }}
                                            idprefix="title-field"
                                            onChange={(event) => setTitle(event.target.value)}
                                            value={title}
                                            placeholder="Заголовок"
                                        />
                                        <input
                                            className="fadeAnimation font-normal leading-tight outline-none text-2xl mb-8  text-black"
                                            style={{ border: "0px" }}
                                            idprefix="desc-field"
                                            onChange={(event) => setDescription(event.target.value)}
                                            value={description}
                                            placeholder="Описание"
                                        />
                                    </div>
                                    <div className="flex justify-between gap-5 w-1/3"
                                        style={{ width: '30%', textAlign: 'center', maxHeight: "35px" }}>
                                        <button
                                            onClick={() => onCancelHandler()}
                                            className="flex items-center justify-around w-92-p rounded-lg p-3"
                                            style={{ backgroundColor: "#f6f6f6" }}
                                        >
                                            Отменить
                                            <CancelSVGIcon style={{ fill: "rgb(255 79 79)" }} />
                                        </button>
                                        <button
                                            onClick={() => onSaveHandler(editorInstance, "create")}
                                            className="flex items-center justify-around w-92-p rounded-lg p-3"
                                            style={{ backgroundColor: "#f6f6f6" }}

                                        >
                                            Сохранить

                                            <SaveSVGIcon style={{ fill: "rgb(39 211 39)" }} />
                                        </button>
                                    </div>
                                </div>
                            </section>
                            :
                            <>
                                <section className="p-4">
                                    {editArticle ?
                                        <div className="flex justify-between">
                                            <div className="flex flex-col w-2/3 ">
                                                <input onChange={(event) => setTitle(event.target.value)}
                                                    className="fadeAnimation  outline-none font-medium leading-tight text-4xl text-black"
                                                    value={title} placeholder={title} />
                                                <input onChange={(event) => setDescription(event.target.value)}
                                                    value={description} placeholder={description}
                                                    className="fadeAnimation font-normal leading-tight outline-none text-2xl mb-8  text-black" />
                                            </div>
                                            <div className="flex justify-between gap-5 w-1/3"
                                                style={{ maxHeight: "35px" }}>
                                                <button
                                                    onClick={() => onCancelHandler()}
                                                    className="flex items-center justify-around w-92-p rounded-lg p-3"
                                                    style={{ backgroundColor: "#f6f6f6" }}
                                                >
                                                    Отменить
                                                    <CancelSVGIcon style={{ fill: "rgb(255 79 79)" }} />
                                                </button>
                                                <button
                                                    onClick={() => onSaveHandler(editorInstance, "edit")}
                                                    className="flex items-center justify-around w-92-p rounded-lg p-3"
                                                    style={{ backgroundColor: "#f6f6f6" }}
                                                >
                                                    Сохранить
                                                    <SaveSVGIcon style={{ fill: "rgb(39 211 39)" }} />
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div
                                                className="fadeAnimation font-medium leading-tight text-4xl text-black">{article?.title}</div>
                                            <div
                                                className="fadeAnimation font-normal leading-tight text-2xl mb-8  text-black">{article?.description}</div>
                                        </div>}

                                    <div className="flex">
                                        <div className=" flex gap-10 items-start">
                                            <div className="text-gray-500 flex flex-col gap-5">
                                                <div>Кем создана (изменена)</div>
                                                <div>Дата последнего изменения</div>
                                                <div>Тэги</div>
                                            </div>
                                            <div className="flex flex-col gap-5 justify-center text-black text-base font-normal">
                                                <div className="flex gap-2 items-center ">
                                                    <div>
                                                        <img className="w-6 h-6 rounded-sm"
                                                            src={`http://192.168.0.203:8787${article?.user?.foto_url}`} />
                                                    </div>
                                                    <div>
                                                        {article?.user?.name}
                                                    </div>
                                                </div>
                                                <div className="">
                                                    {date}
                                                </div>
                                                <div className="flex gap-2 p-0 overflow-x-scroll " style={{ color: "#6c6b6b", maxWidth: "724px" }}>
                                                    {modeCreate || editArticle ?
                                                        addTagMode
                                                            ?
                                                            <form id="add-tag" onSubmit={onAddTagHandler}>
                                                                <input autoFocus onBlur={tagInputBlurEffect} placeholder={"Ведите название тэга"} value={tagInput} onChange={onChangeTagInput} className="rounded-md fadeAnimation  outline-none  list_hover_whiteBG text-black p-1 pr-0 pl-2"></input>
                                                            </form>
                                                            :
                                                            <Button leftIcon={<AddSVGIcon />} onClickHandler={() => setAddTagMode(true)} classNames="rounded-md mt-0 p-1 pr-2 pl-2 gap-5" text="Добавить" />
                                                        :
                                                        null
                                                    }
                                                    {tags?.length !== 0 && tags?.map((tag, index) => (
                                                        <div className="p-1 pr-2 pl-2 rounded-md flex gap-5" style={{ backgroundColor: "rgb(239, 239, 239)", }}>
                                                            <span>{tag}</span>
                                                            {modeCreate || editArticle ?
                                                                <div className="flex gap-2">
                                                                    <div className="cursor-pointer" onClick={() => editTagHandler(index)}><EditSVGIcon /></div>
                                                                    <div className="cursor-pointer" onClick={() => deleteTagHandler(index)}><DeleteSVGIcon /></div>
                                                                </div>
                                                                :
                                                                null
                                                            }

                                                        </div>
                                                    ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        }

                        <div className="editor-wrap">
                            {editorComponent}
                        </div>

                    </div>}
                </div>
            }
        </>

    )
}

export default Editor
