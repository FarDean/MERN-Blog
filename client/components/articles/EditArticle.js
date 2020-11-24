import React,{useState,useEffect,useContext} from 'react'
import { GlobalContext } from "./../../context/GlobalContext";
import { BookOpen,Image} from "phosphor-react"
import FormData from 'form-data'
import { Link, Redirect } from 'react-router-dom'

export default function EditArticle({match}) {
    const {article,updateArticle,error,message,setToNull,user} = useContext(GlobalContext)

    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [title, setTitle] = useState(article.title)
    const [image, setImage] = useState(article.image)
    const [markdown, setMarkdown] = useState(article.markdown)

    useEffect(() => {
        setToNull()
    }, [])

    error || message && setTimeout(() => {
        setToNull()
    }, 3000);

    useEffect(() => {
        if(message)setRedirect(true)
    }, [message])

    function onSubmit(e){
        e.preventDefault()

        let updatedArticle = new FormData()
        updatedArticle.append('title',title)
        updatedArticle.append('image',image)
        updatedArticle.append('markdown',markdown)

        setLoading(true)
        const jwt =sessionStorage.getItem('jwt') ? JSON.parse(sessionStorage.getItem('jwt')) :undefined
        updateArticle(match.params,jwt,updatedArticle)
        setLoading(false)
    }
    

    return (
        <>
            {loading && <div class="lds-dual-ring"></div>}
            <div className="container">
                {error && 
                <div class="alert-danger">
                    {error}
                </div>}
                {message && 
                <div class="alert-success">
                    {message}
                </div>}
            
            </div>
            <div className="container">
                <div className="create-article">
                    <h1>Edit Article</h1>
                    <hr className='hr-articles' />
                    <div className="signup-form">
                        <form onSubmit={onSubmit} encType='mumultipart/form-data'>
                            <div className="textbox">
                                <BookOpen size={48} /><input onChange={e=>setTitle(e.target.value)} value={title} type="text" name="title" placeholder='Title' id="title"/>
                            </div>

                            <div className="textbox">
                                <Image size={48} /><input onChange={e=>setImage(e.target.files[0])}  type="file" name="image" placeholder='Upload Image' id="image"/>
                            </div>
                            <div>
                                <textarea onChange={e=>setMarkdown(e.target.value)} name="markdown" value={markdown} id="markdown" cols="40" placeholder='Markdown' rows="15"></textarea>
                            </div>
                            <div className='button-wrapper'>
                                <button onSubmit={onSubmit} type='submit' className='btn'>Submit</button>
                                <button className='btn'><Link to='/admindashboard'>Cancel</Link></button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            {redirect &&<Redirect push to='/articles' />}
        </>
    )
}
