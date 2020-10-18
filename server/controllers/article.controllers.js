import Article from './../models/Article'
import User from './../models/User'
import ErrorHandler from './../helpers/dbErrorHandler'
import { extend } from 'lodash'
const create = async(req,res)=>{
    const article = new Article({
        title:req.body.title,
        image:req.body.image,
        markdown:req.body.markdown,
        postedBy:req.auth._id
    })
    try {
        await article.save()
        await User.findByIdAndUpdate(req.auth._id,{$push:{articles:article._id}},{new:true})
        return res.status(200).json({
            message:"article Created",
            article
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const list = async(req,res)=>{
    try {
        const articles = await Article.find()
                                    .populate('postedBy','name')
        return res.status(200).json(articles)
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
    let article = req.article
    article = extend(article,req.body)
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


export {list,create,remove,read,articleById,update}