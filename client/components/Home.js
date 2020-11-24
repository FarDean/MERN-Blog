import React,{useState,useEffect,useContext} from 'react'
import { Link,Redirect } from 'react-router-dom'
import {GlobalContext} from './../context/GlobalContext'

import { User,Calendar} from "phosphor-react"

import Slider from "react-slick";

export default function Home() {

    const [loading, setLoading] = useState(false)
    const {articles,getAllArticles,error,message,setToNull} = useContext(GlobalContext)


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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        slidesToShow: 2,
        autoplaySpeed: 3000,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1504,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 780,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    
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

            <main>

                <section className="site-title">
                    <div className="site-background">
                        <h3>Posts & blogs</h3>
                        <h1>Amazing blog on Earth</h1>
                        <a href="#blog"><button className='btn'>Explore</button></a>
                    </div>

                </section>


                <section>
                    <div className="blog" id="blog">
                        <div className="container">
                            <Slider {...settings}>
                                {articles.map(article=>(
                                    <div key={article._id} className="blog-post">
                                        <div className="blog-content">
                                            <img src={`/api/articles/image/` + article._id} alt=""/>
                                            <div className="blog-title">
                                                <h3>{article.title}</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum recusandae in quaerat?..</p>
                                                <Link to={`/articles/` + article._id}><button className="btn btn-blog">Read More...</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </section>

                <section className="container">
                    <div className="site-content">
                        <div className="posts">
                            <h2>Articles</h2>
                            <hr/>
                            {articles.map(article=>(
                                <div key={article._id} className="post-content">
                                    <div className="post-image">
                                        <div>
                                            <img className='img' src={`/api/articles/image/` + article._id} alt=""/>
                                        </div>
                                        <div className="post-info flex-row">
                                            <span>FarDean</span><User size={30} />
                                            <span>12/02/2020</span><Calendar size={30} />
                                        </div>
                                    </div>
                                    <div className="post-title">
                                        <a href="#">{article.title}</a>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur odio perferendis beatae velit reiciendis quas natus excepturi iste eligendi mollitia ipsam officia, eaque in maiores laudantium a sunt assumenda repudiandae autem! Expedita earum dicta excepturi eum optio necessitatibus magnam consequatur.</p>
                                        <Link to={`/articles/` + article._id}><button className="btn post-btn">Read More...</button></Link>
                                    </div>
                                    <hr/>
                                </div>
                                
                            ))}
                        </div>
                        <aside className="sidebar">
                            <div className="category">

                                <h2>Categories</h2>
                                <hr/>
                                <ul className="category-list">
                                    <li className="list-items">
                                        <a href="#">Software</a>
                                        <span>(05)</span>
                                    </li>
                                    <li className="list-items">
                                        <a href="#">Tech</a>
                                        <span>(03)</span>
                                    </li>
                                    <li className="list-items">
                                        <a href="#">Lifestyle</a>
                                        <span>(02)</span>
                                    </li>
                                    <li className="list-items">
                                        <a href="#">Others</a>
                                        <span>(07)</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="popular-post">
                                <h2>Popular Posts</h2>
                                <hr/>
                                {articles.reverse().map(article=>(
                                    <div key={article._id} className="post-content">
                                        <div className="post-image">
                                            <div>
                                                <img className='img' src={`/api/articles/image/` + article._id} alt=""/>
                                            </div>
                                            <div className="post-info flex-row">
                                                <span>FarDean</span><User size={30} />
                                                <span>12/02/2020</span><Calendar size={30} />
                                            </div>
                                        </div>
                                        <div className="post-title">
                                            <Link to={`/articles/` + article._id}>{article.title}</Link>
                                        </div>
                                       
                                    </div>
                                ))}
                            </div>
                            <div className="newsletter">
                                <h2>Newsletter</h2>
                                <div className="form-element">
                                    <input type="text" className='input-element' placeholder='Email' />
                                    <button className="btn form-btn">Subscribe</button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    )

}
