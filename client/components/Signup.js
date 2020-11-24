import React,{useContext,useState,useEffect} from 'react'
import {GlobalContext} from './../context/GlobalContext'
import { User,Key,At } from "phosphor-react"
import { Link } from 'react-router-dom'

export default function Signup() {
    const {registerUser,error,message,setToNull} = useContext(GlobalContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setToNull()
    }, [])

    const user ={
        name,
        email,
        password
    }
    
    const onSubmit = (e) =>{
        e.preventDefault()

        setLoading(true)
        registerUser(user)
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
                <h1 className='articles-header'>Sign Up</h1>
                <hr className='hr-articles' />
                <div className="signup-form">
                    <form onSubmit={onSubmit}>
                        <div className="textbox">
                            <User size={35} /><input onChange={(e)=>{setName(e.target.value)}} type="text" name="name" placeholder='Name' id="name"/>

                        </div>
                        
                        <div className="textbox">
                            <At size={35} /><input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" placeholder='Email' id="email"/>

                        </div>
                        
                        
                        <div className="textbox">
                            <Key size={35} /><input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder='Password' id="password"/>

                        </div>
                        
                        <div className='button-wrapper'>
                            <button type='submit' className='btn'>Submit</button>
                            <Link to='/'><button className='btn'>Cancel</button></Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
