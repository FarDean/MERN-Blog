import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    image:{

            data:Buffer,
            contentType:String,
    },
    markdown:{
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

const Article = mongoose.model('Article',ArticleSchema)
export default Article;