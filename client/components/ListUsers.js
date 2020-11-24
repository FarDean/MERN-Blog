import React,{useContext,useEffect,useState} from 'react'
import {GlobalContext} from './../context/GlobalContext'
export default function ListUsers() {
    const {users,error,getUsers} = useContext(GlobalContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const jwt =sessionStorage.getItem('jwt') ? JSON.parse(sessionStorage.getItem('jwt')) :undefined
        getUsers(jwt)
        setLoading(false)
    }, [])

    return (
        <>
            {loading && <div class="lds-dual-ring"></div>}
            {error && <h2>{error}</h2>}
            {users.map(user=>(
                <h2 key={user._id}>{user.name}</h2>
            ))}
        </>
    )
}
