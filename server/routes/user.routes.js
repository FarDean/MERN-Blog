import {create, list, read, remove, update, userById} from './../controllers/user.controllers'
import {hasAuth,requireSignin} from './../controllers/auth.controllers'
import express from 'express'
const router = express.Router()

router.route('/api/users')
    .post(create)
    .get(requireSignin,hasAuth,list)


router.route('/api/users/:userId')
    .get(requireSignin,hasAuth,read)
    .put(requireSignin,hasAuth,update)
    .delete(requireSignin,hasAuth,remove)


router.param('userId',userById)
export default router