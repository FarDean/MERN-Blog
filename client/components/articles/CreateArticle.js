import React,{useContext,useEffect,useState} from 'react'
import { GlobalContext } from "./../../context/GlobalContext";
import ReactMarkdown from 'react-markdown'
import { BookOpen,Image} from "phosphor-react"
import FormData from 'form-data'
import { Link, Redirect } from 'react-router-dom'



export default function CreateArticle() {
    const {message,error,setToNull,createArticle} = useContext(GlobalContext)

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [markdown, setMarkdown] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setToNull()
    }, [])

    error || message && setTimeout(() => {
        setToNull()
    }, 3000);


    function onSubmit(e) {
        e.preventDefault()
        let newArticle = new FormData()
        newArticle.append('title',title)
        newArticle.append('image',image)
        newArticle.append('markdown',markdown)

        setLoading(true)
        const jwt =sessionStorage.getItem('jwt') ? JSON.parse(sessionStorage.getItem('jwt')) :undefined
        createArticle(jwt,newArticle)
        setLoading(false)

    }

    useEffect(() => {
        if(message)setRedirect(true)
    }, [message])


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
                    <h1>Create new article</h1>
                    <hr className='hr-articles' />
                    <div className="signup-form">
                        <form onSubmit={onSubmit} encType='mumultipart/form-data'>
                            <div className="textbox">
                                <BookOpen size={48} /><input onChange={e=>setTitle(e.target.value)} type="text" name="title" placeholder='Title' id="title"/>
                            </div>

                            <div className="textbox">
                                <Image size={48} /><input onChange={e=>setImage(e.target.files[0])} type="file" name="image" placeholder='Upload Image' id="image"/>
                            </div>
                            <div>
                                <textarea onChange={e=>setMarkdown(e.target.value)} name="markdown" id="markdown" cols="40" placeholder='Markdown' rows="15"></textarea>
                            </div>
                            <div className='button-wrapper'>
                                <button type='submit' className='btn'>Submit</button>
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
