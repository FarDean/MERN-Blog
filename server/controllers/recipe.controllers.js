import Recipe from './../models/Recipe'
import ErrorHandler from './../helpers/dbErrorHandler'
import User from './../models/User'
import { extend } from 'lodash'
const create = async(req,res)=>{
    const recipe = new Recipe({
        title:req.body.title,
        ingredients:req.body.ingredients,
        description:req.body.description,
        instruction:req.body.instruction,
        postedBy:req.auth._id
    })
    try {
        await recipe.save()
        await User.findByIdAndUpdate(req.auth._id,{$push:{recipes:recipe._id}},{new:true})
        return res.status(201).json({
            recipe,
            message:"recipe created"
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
        const recipes = await Recipe.find().populate('postedBy','name')
        return res.status(200).json(recipes)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const recipeById = async(req,res,next,id)=>{
    try {
        const recipe = await Recipe.findById(id)
                                    .populate('postedBy','name')
                                    .select('-__v')
        if(!recipe)return res.status(404).json({
            error:'recipe not found!'
        })
        req.recipe = recipe
        next()
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }    
}

const read = async(req,res)=>{
    return res.status(200).json(req.recipe)
}

const update = async(req,res)=>{
    let recipe = req.recipe
    recipe = extend(recipe,req.body)
    try {
        await recipe.save()
        return res.status(201).json({
            recipe,
            message:"recipe updated!"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

const remove = async(req,res)=>{
    const recipe = req.recipe
    try {
        await recipe.remove()
        return res.status(200).json({
            message:'recipe deleted!'
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error:ErrorHandler.getErrorMessage(err)
        })
    }
}

export {remove,update,recipeById,read,list,create}