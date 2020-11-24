import React,{useState,useEffect,useContext} from 'react'
import { InstagramLogo,TwitterLogo,FacebookLogo,ListDashes } from "phosphor-react"
import { Link } from 'react-router-dom'
import { authenticated } from "./../helpers/auth-helper";


export default function Navbar({history}) {
    const [burgerOpen, setBurgerOpen] = useState(false)

    return (
            <nav className={burgerOpen ? 'active nav' : 'nav'}>
                <div className="nav-menu flex-row">
                    <div className="nav-brand">
                        <a href="#" className="text-grey">My Blog</a>
                    </div>
                    <div onClick={()=>setBurgerOpen(!burgerOpen)} className="toggle-collapse">
                        <div className="toggle-icons">
                            <ListDashes size={40} />
                        </div>
                    </div>
                    <div>
                        <ul className="nav-items">
                            <li className="nav-link">
                               <Link to='/'>Home</Link>
                            </li>
                            <li className="nav-link">
                                <Link to='/articles'>Articles</Link>
                            </li>
                            {authenticated() ? <li className="nav-link"><Link to='/admindashboard'>Dashboard</Link></li> :
                            <li className="nav-link">
                                <Link to='/signup'>Sign Up</Link>
                            </li>
                            }
                            {authenticated() ? null :
                            <li className="nav-link">
                            <Link to='/signin'>Sign In</Link>
                            </li>
                            }
                        </ul>
                    </div>
                    <div className="social text-gery">
                        <a href="#"><TwitterLogo size={25} /></a>
                        <a href="#"><InstagramLogo size={25} /></a>
                        <a href="#"><FacebookLogo size={25} /></a>
                    </div>
                </div>
            </nav>
    )
}
