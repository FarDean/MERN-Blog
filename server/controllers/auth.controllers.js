import User from './../models/User'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

const signin =async(req,res)=>{
    try {
        const {name,password}=req.body
        const user = await User.findOne({name})
        if(!password || !name) return res.status(400).json({
            error:'please fill all the fields'
        })
        if(!user) return res.status(404).json({
            error:"user doesnt exist"
        })

        if(!user.authenticate(password)){
            return res.status(400).json({
                error:'wrong password'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    
        res.cookie('t',token)
    
        return res.json({
            token,
            message: 'Successfully signed in!',
            user:{
                name:user.name,
                isAdmin:user.isAdmin
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error:"couldnt sign in"
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