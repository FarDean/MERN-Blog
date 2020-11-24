import express from 'express'
import {hasAuth,requireSignin} from './../controllers/auth.controllers'
import {list,create,articleById,update,read,remove, getImage} from './../controllers/article.controllers'
const router = express.Router()

router.route('/api/articles')
    .get(list)
    .post(requireSignin,hasAuth,create)

router.route('/api/articles/:articleId')
    .get(read)
    .put(requireSignin,hasAuth,update)
    .delete(requireSignin,hasAuth,remove)



router.route('/api/articles/image/:articleId')
    .get(getImage)

router.param('articleId',articleById)



export default router;