import express from 'express'
import heroesController from './heroesController'

const { getHeroes, getHero, updateHero, addHero,removeHero } = heroesController

const router = express.Router()

router.get('/', getHeroes)
router.get('/:id', getHero)
router.put('/:id', updateHero)
router.post('/', addHero)
router.delete('/:id',removeHero)

export default router
