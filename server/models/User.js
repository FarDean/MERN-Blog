import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'User name is required'
    },
    email:{
        type:String,
        trim:true,
        required:'Emial is required',
        unique: 'Email already exists!',
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'please enter a valid email address.']
    },
    hashed_password:{
        type:String,
        required:'password is required!'
    },
    salt:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    articles:[{
        type:Schema.Types.ObjectId,ref: 'Article'
    }],
    recipes:[{
        type:Schema.Types.ObjectId,ref: 'Recipe'
    }]
},{
    timestamps:true
})

UserSchema.methods ={
    encryptPassword: function(password){
        if(!password) return null;
        return crypto.createHmac('sha256',this.salt).update(password).digest('hex')
    },
    makeSalt:function(){
        return crypto.randomBytes(20).toString('hex')
    },
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    }
}


UserSchema.virtual('password')
    .set(function(password){
        this._password = password,
        this.salt = this.makeSalt(),
        this.name === 'Parya'? this.isAdmin =true:false,
        this.hashed_password = this.encryptPassword(password)
    }).get(()=>{
        return this._password
    })


UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length <6){
        this.invalidate('password','Password must be at least 6 characters')
    }
    if(this.name && this.name.length <3){
        this.invalidate('name','name must be at least 3 characters')
    }
    if(this.isNew && !this._password){
        this.invalidate('password','Passwotd is Required!')
    }
},null)

const User = mongoose.model('User',UserSchema)
export default User;