import React,{createContext,useReducer} from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'
let initialState= {
    users:[],
    articles:[],
    recipes:[],
    error:null,
    message:null,
    token:null,
    article:{},
    user:{}
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children})=> {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    async function registerUser(user){
        const config= {
            headers:{
                'Content-Type': 'application/json',
            }
        }
        try {
            const res =await axios.post('/api/users',user,config)
            dispatch({
                type: 'REGISTER_USER',
                payload: res.data.message
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }

    async function getUsers(jwt){
        const config = {
            headers:{
                'Authorization':`Bearer ${jwt}`
            }
        }
        try {
            const res =await axios.get('/api/users',config)

            dispatch({
                type: 'GET_USERS',
                payload:res.data
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }

    async function signIn(user){
        const config = {
            headers:{
                'Content-Type': 'application/json'
            },
            withCredentials:true
        }
        try {
            const res = await axios.post('/auth/signin',user,config)
            
            dispatch({
                type:'SIGN_IN',
                payload:res.data
            })

            console.log(res.data);
        } catch (err) {
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }

    async function createArticle(jwt,article){
        const config = {
            headers:{
                'Authorization':`Bearer ${jwt}`,
            }
        }
        try {
            const res = await axios.post('/api/articles',article,config)
            console.log(res);
            dispatch({
                type: 'CREATE_ARTICLE',
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }

    async function getAllArticles(){
        try {
            const res = await axios.get('/api/articles')

            dispatch({
                type: 'GET_ALL_ARTICLES',
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }

    async function getSingleArticle(params){
        try {
            const res = await axios.get('/api/articles/' + params.articleId)

            dispatch({
                type:'GET_SINGLE_ARTICLE',  
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }

    async function updateArticle(params,jwt,updatedarticle) {
        const config = {
            headers:{
                'Authorization':`Bearer ${jwt}`
            }
        }
        try {
            const res = await axios.put('/api/articles/' + params.articleId,updatedarticle,config)

            dispatch({
                type: 'UPDATE_ARTICLE',
                payload:res.data
            })
            console.info(res.data);
        } catch (err) {
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }

    async function deleteArticle(params,jwt){
        const config = {
            headers :{
                'Authorization':`Bearer ${jwt}`
            }
        }

        try {
            const res = await axios.delete('/api/articles/' + params.articleId,config)

            dispatch({
                type: 'DELETE_ARTICLE',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type:'ERROR',
                payload:err.response.data.error
            })
        }
    }


    function setToNull(){
        dispatch({
            type: 'SET_NULL',
            payload:null
        })
    }
    
    return (<GlobalContext.Provider value={{
        users:state.users,
        user:state.user,
        registerUser,
        response:state.response,
        getUsers,
        signIn,
        error:state.error,
        message:state.message,
        setToNull,
        token:state.token,
        articles:state.articles,
        recipes:state.recipes,
        createArticle,
        getAllArticles,
        article:state.article,
        getSingleArticle,
        updateArticle,
        deleteArticle
    }}>
        {children}
    </GlobalContext.Provider>);
}

