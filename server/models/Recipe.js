import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:[],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    instruction:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }  
},{
    timestamps:true
})

const Recipe = mongoose.model('Recipe',RecipeSchema)
export default Recipe;