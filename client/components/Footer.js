import React from 'react'
import { ArrowCircleUp,CaretRight,InstagramLogo,FacebookLogo,TwitterLogo} from "phosphor-react"



export default function Footer() {

    function scrollToTop() {
        window.scrollTo(0,0)
    }
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="about-us">
                        <h2>About Us</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ut voluptates qui ea, id excepturi tempore dignissimos illo architecto vero.</p>
                    </div>
                    <div className="newsletter">
                        <h2>Newsletter</h2>
                        <p>Stay updated with our latest!</p>
                        <div className="form-element">
                            <input type="text" placeholder='Email' /><span><CaretRight size={20} /></span>
                        </div>
                    </div>
                    <div className="instagram">
                        <h2>Instagram</h2>
                        <div className="flex-row">
                            <img src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" alt="insta1"/>
                            <img src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="insta2"/>
                            <img src="https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" alt="insta3"/>
                        </div>
                        <div className="flex-row">
                            <img src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="insta4"/>
                            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1082&q=80" alt="insta5"/>
                            <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="insta6"/>
                        </div>
                    </div>
                    <div className="follow">
                        <h2>Follow Us</h2>
                        <p>Let us be Social!</p>
                        <div>
                            <a href="#"><TwitterLogo size={25} /></a>
                            <a href="#"><InstagramLogo size={25} /></a>
                            <a href="#"><FacebookLogo size={25} /></a>
                        </div>
                    </div>
                </div>
                <div className="rights flex-row">
                    <h4 className="text-grey">
                        Copyright @2020 All rights reserved | Made By <a href="#">FarDean</a>
                    </h4>
                </div>
                <div onClick={scrollToTop} className="move-up">
                    <ArrowCircleUp size={68} />
                </div>
            </footer>
        </>
    )
}
