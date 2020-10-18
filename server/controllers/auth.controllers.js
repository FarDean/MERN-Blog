import User from './../models/User'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

const signin =async(req,res)=>{
    try {
        const {name,password}=req.body
        const user = await User.findOne({name})
        if(!user) return res.json({
            message:"user doesnt exist"
        })
        if(!password || !name) return res.status(400).json({
            message:'please fill all the fields'
        })
        if(!user.authenticate(password)){
            return res.status(400).json({
                message:'wrong password'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    
        res.cookie('t',token)
    
        return res.json({
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                articles:user.articles,
                recipes:user.recipes
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message:"couldnt sign in"
        })
    }
}

const signout = (req,res)=>{
    res.clearCookie('t')
    return res.status(200).json({
        message:"signed out"
    })
}

const requireSignin = expressJwt({
    secret:'kos',
    userProperty:'auth',
    algorithms: ['HS256']
})

const hasAuth =async (req,res,next)=>{
    const user = await User.findById(req.auth._id)
    const autherized =user.isAdmin && req.auth
    if(!autherized) return res.status(401).json({
        error:"user not autherized"
    })
    next()
}
export {signin, signout,hasAuth,requireSignin}