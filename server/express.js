if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
import express from 'express'
import Template from '../template'
// import {compile} from './devBundle'
import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'
import path from 'path'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import articleRouter from './routes/article.routes'
import recipeRouter from './routes/recipe.routes'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import MainRouter from './../client/MainRouter'
import { Helmet } from "react-helmet";

const CURRENT_WORKING_DIRECTORY = process.cwd()
const app = express()
// compile(app)
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use('/dist',express.static(path.join(CURRENT_WORKING_DIRECTORY,'dist')))
app.use('/',userRouter)
app.use('/',authRouter)
app.use('/',articleRouter)
app.use('/',recipeRouter)


app.get('*',(req,res)=>{
    const context ={}
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <MainRouter />
        </StaticRouter>
    )

    const helmet = Helmet.renderStatic();

    if(context.url){
        return res.redirect(303,context.url)
    }
    res.status(200).send(Template(markup,helmet))
})

app.use((err,req,res,next)=>{
    if(err.name === 'UnautherizedError'){
        
        res.status(401).json({
            error:err.name + ": " + err.message
        })
    }else if(err){
        res.status(400).json({
            error:err.name + ": " +err.message
        })
    }
})

export default app