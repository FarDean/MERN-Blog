import React from 'react'
import { Route, Switch} from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import CreateArticle from './components/articles/CreateArticle'
import EditArticle from './components/articles/EditArticle'
import ListArticles from './components/articles/ListArticles'
import ReadArticle from './components/articles/ReadArticle'
import Footer from './components/Footer'
import Home from './components/Home'
import ListUsers from './components/ListUsers'
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Signup from './components/Signup'




export default function MainRouter() {


    return (
        <>
            <Route path='/' component={Navbar} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/users' component={ListUsers} />
                <Route exact path='/admindashboard' component={AdminDashboard} />
                <Route exact path='/newarticle' component={CreateArticle} />
                <Route exact path='/articles' component={ListArticles} />
                <Route exact path='/articles/:articleId' component={ReadArticle} />
                <Route exact path='/articles/edit/:articleId' component={EditArticle} />
            </Switch>
            <Route path='/' component={Footer} />
        </>
    )
}
