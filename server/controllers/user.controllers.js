import { extend } from 'lodash'
import User from './../models/User'
import ErrorHandler from './../helpers/dbErrorHandler'

const create = async(req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(201).json({
            message:"user created btich!"
        })
    } catch (err) { 
        return res.status(400).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const list = async(req,res)=>{
    try {
        const users = await User.find()
            .populate('articles','title')
            .populate('recipes','title')
        return res.status(200).json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const userById = async(req,res,next,id)=>{
    const user = await User.findById(id)
                            .populate('articles','title')
                            .populate('recipes','title')
    if(!user){
        return res.status(404).json({
            error: "user not found !"
        })
    }
    req.profile = user
    return next()
}

const read = async(req,res)=>{
    const user = req.profile
    return res.status(200).json(user)
}

const update = async(req,res)=>{
    try {
        let user =req.profile
        user = extend(user,req.body)
        await user.save()
        return res.status(201).json({
            user,
            message:"user updated"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const remove = async(req,res)=>{
    try {
        const user = req.profile
        await user.remove()
        return res.status(200).json({
            message:"user deleted!"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}


export  {remove,create,list,read,update,userById}