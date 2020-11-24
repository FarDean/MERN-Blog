import React,{useContext,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {GlobalContext} from './../../context/GlobalContext'
import { User,Calendar} from "phosphor-react"


export default function ReadArticle({match}) {
    const {article,error,message,getSingleArticle,setToNull,user,deleteArticle} = useContext(GlobalContext)

    const [loading, setLoading] = useState(false)
    const [articleImg, setArticleImg] = useState('')
    
    useEffect(() => {
        setToNull()
    }, [])

    error || message && setTimeout(() => {
        setToNull()
    }, 3000);

    useEffect(() => {
        setLoading(true)
        getSingleArticle(match.params)
        setArticleImg(`/api/articles/image/` + match.params.articleId)
        setLoading(false)
    }, [])

    function onClick() {
        setLoading(true)
        const jwt =sessionStorage.getItem('jwt') ? JSON.parse(sessionStorage.getItem('jwt')) :undefined
        deleteArticle(match.params,jwt)
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
                <div className="read-article">
                    <h1>{article.title}</h1>
                    <div className="post-image">
                        <div>
                            <img className='img' src={articleImg} alt=""/>
                        </div>
                        <div className="flex-row text-grey">
                            <span>FarDean</span><User size={20} />
                            <span>12/02/2020</span><Calendar size={20} />
                        </div>
                    </div>
                    <div className="post-markdown">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, veritatis esse enim, quaerat obcaecati nemo itaque saepe ipsum natus quae velit delectus aliquid hic fuga maxime beatae, totam pariatur fugiat molestiae deleniti? Cum possimus quod, rerum earum, veritatis iusto cupiditate delectus, eius nobis ab vel. Quam libero, itaque unde mollitia reiciendis veritatis sed enim quos hic porro rem quas commodi? Distinctio blanditiis dolores facilis, aperiam placeat sapiente ullam, unde voluptates officiis molestiae provident sed eum fuga accusamus voluptatibus labore quae corporis nam. Odit iusto saepe tempora rerum voluptatem doloribus quae sequi veritatis. Alias nisi ducimus perferendis veritatis atque blanditiis excepturi expedita eius. Pariatur suscipit, nisi nulla rerum incidunt nobis quos id excepturi quam dolore adipisci, reprehenderit quia praesentium dolores minus neque hic maiores dolorem ab, minima soluta accusamus! Necessitatibus aliquid quos, quas voluptatibus officiis quaerat ducimus nam earum cumque eius assumenda cum sed beatae quam, commodi, eligendi dolorum vitae quibusdam quae error. Alias corrupti porro ipsam maxime pariatur ad hic delectus atque voluptatum? Nam aspernatur repellat, obcaecati autem itaque ut saepe exercitationem quae laboriosam modi ex enim, minus corrupti, perspiciatis doloribus. Similique cupiditate modi dolores minus sint ullam recusandae unde quos adipisci odio. Voluptates autem vero a fuga neque, quibusdam quod. In atque rem magni natus placeat commodi quis maxime, eaque fuga debitis sapiente labore recusandae itaque totam error dolorem sint facere perferendis, ratione, voluptatum doloribus explicabo ea amet consectetur? Corrupti eius cupiditate dignissimos sint natus eligendi reprehenderit aut itaque recusandae error molestiae deleniti eum, minus eveniet. Aspernatur in quod quae veritatis pariatur doloremque repellat dolore. Incidunt labore suscipit mollitia neque ipsum quidem. Ea autem, voluptatibus culpa rerum reprehenderit provident, itaque voluptates mollitia vel tempora maiores quae ut earum quasi doloremque possimus facilis aperiam obcaecati! Blanditiis molestiae doloremque itaque sit tempore sint pariatur sed tenetur laudantium dolor officiis amet, qui iste voluptatem nisi fuga accusamus! Odio totam quam, dolor doloribus tempora rerum itaque magnam amet quidem ut minima molestias pariatur voluptates quaerat assumenda ullam, quos aspernatur distinctio nisi dolore eos nulla! Dicta ab adipisci quos aliquid temporibus sit eum rerum quisquam nihil eligendi. Voluptates vitae nulla perspiciatis quia aperiam accusantium alias quibusdam similique, culpa, quae sed. Incidunt excepturi praesentium temporibus, harum voluptatibus pariatur consectetur? Nobis hic veritatis ab dicta libero ducimus, architecto sed deleniti quos dignissimos dolores ipsam eaque? Distinctio neque quis unde sequi, nisi molestiae, beatae commodi modi autem voluptas perferendis ad nobis nesciunt similique minima tempora nulla sint dolores dolore facere aliquid ex adipisci. Repellat, rem, eius beatae in velit, odit perferendis earum placeat aperiam quo laboriosam praesentium eveniet. Tempora ducimus excepturi, rerum voluptatibus enim similique recusandae eaque, qui vero, maiores molestias? Fuga, quod omnis facere consequatur iste dolore! Hic et cum, optio exercitationem numquam natus perferendis totam nisi dolorem ad similique eveniet quae incidunt molestias, enim architecto in mollitia magni quas necessitatibus cupiditate illo molestiae eligendi! Magnam ipsum deserunt assumenda dolore dolorem consequuntur quod. Consectetur modi autem nihil exercitationem quasi pariatur odio laborum unde velit debitis blanditiis ducimus, fuga minima iste saepe. Nisi libero recusandae nobis sit?</p>
                    </div>
                </div>
                <div className='button-wrapper'>
                    {sessionStorage.getItem('jwt') && <Link to={'/articles/edit/' +article._id} ><button className='btn'>Edit</button></Link>}
                    {sessionStorage.getItem('jwt') && <button className='btn' onClick={onClick}>Delete</button>}
                </div>
            </div>
            
            
        </>
    )
}
