import express from 'express'
import { remove,update,recipeById,read,list,create } from '../controllers/recipe.controllers';
import {hasAuth,requireSignin} from './../controllers/auth.controllers'
const router = express.Router()

router.route('/api/recipes')
    .get(list)
    .post(requireSignin,hasAuth,create)


router.route('/api/recipes/:recipeId')
    .get(read)
    .put(requireSignin,hasAuth,update)
    .delete(requireSignin,hasAuth,remove)

router.param('recipeId',recipeById)

export default router;