import express from 'express'
import heroesController from './heroesController'

const { getHeroes, getHero, updateHero, addHero } = heroesController

const router = express.Router()

router.get('/', getHeroes)
router.get('/:id', getHero)
router.put('/:id', updateHero)
router.post('/', addHero)

export default router
