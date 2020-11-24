import React,{useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import {GlobalContext} from './../../context/GlobalContext'
import { motion } from "framer-motion"

export default function ListArticles() {
    const {message,error,setToNull,getAllArticles,articles} = useContext(GlobalContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setToNull()
    }, [])

    error || message && setTimeout(() => {
        setToNull()
    }, 3000);


    useEffect(() => {
        setLoading(true)
        getAllArticles()
        setLoading(false)
    }, [])
    return (
        <div>
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
                <h1 className='articles-header'>Articles</h1>

                <hr className='hr-articles' />
                <div className="article-showcase">
                    {articles.map(article=>(
                        <div key={article._id} className="article-gird-item">
                            <div>
                                <img src={`/api/articles/image/` + article._id} alt=""/>
                            </div>
                            <div className='article-label'>
                                <p><Link to={`/articles/` + article._id}>{article.title}</Link></p>
                                <span className='text-grey'>10/03/2020</span>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
