import Article from './../models/Article'
import User from './../models/User'
import ErrorHandler from './../helpers/dbErrorHandler'
import { extend } from 'lodash'
import formidable from 'formidable'
import fs from 'fs'

const create = async(req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Photo couldn't be uploaded"
            })
        }
        const article = new Article({
            title:fields.title,
            image:fields.image,
            markdown:fields.markdown,
            postedBy:req.auth._id
        })

        if(files.image){
            article.image.data = fs.readFileSync(files.image.path)
            article.image.contentType = files.image.type
        }

        try {
            await article.save()
            await User.findByIdAndUpdate(req.auth._id,{$push:{articles:article._id}},{new:true})
            return res.status(200).json({
                message:"article Created",
                article:{
                    title:article.title,
                    markdown:article.markdown,
                    postedBy:article.postedBy
                }
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error:ErrorHandler.getErrorMessage(err)
            })
        }
    })
}

const list = async(req,res)=>{
    try {
        const articles = await Article.find()
                                    .populate('postedBy','name')
        
        const response = articles.map(article=>{
            return {
                _id:article._id,
                title:article.title,
                markdown:article.markdown,
                postedBy:article.postedBy,
                image:{
                    request: 'GET',
                    url: 'http://localhost:5000/api/articles/image/' + article._id
                }
            }
        })
        return res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const articleById= async(req,res,next,id)=>{
    try {
        const article = await Article.findById(id)
                                        .populate('postedBy','name')
                                        .select('-__v')
        if(!article) return res.status(404).json({
            error:"Article not found"
        })
        req.article = article
        next()
    } catch (err) { 
        console.log(err);
        return res.status(500).json({
            error:"somthing went wrong!"
        })
    }
}

const read = async(req,res)=>{
    const article = req.article
    return res.status(200).json(article)
}

const update= async(req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error: "Couldn't upload the image"
            })
        }

        let article = req.article
        article = extend(article,fields)

        if(files.image){
            article.image.data =fs.readFileSync(files.image.path)
            article.image.contentType = files.image.type
        }
        try {
            await article.save()
            return res.status(200).json({
                article,
                message:"article updated!"
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: ErrorHandler.getErrorMessage(err)
            })
        }
    })

}

const remove = async(req,res)=>{
    const article = req.article
    try {
        await article.remove() 
        return res.status(200).json({
            message:"Article Deleted!"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const getImage = (req,res,next)=>{
    res.set("Content-Type",req.article.image.contentType)
    return res.send(req.article.image.data)
}


export {list,create,remove,read,articleById,update,getImage}