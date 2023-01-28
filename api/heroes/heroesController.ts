import heroesService from './heroesService'
import { Request, Response } from 'express'

export default {
  getHero,
  getHeroes,
  updateHero,
  addHero,
  removeHero,
}

async function getHeroes(req: Request, res: Response) {
  try {
    const heroes = await heroesService.query()
    res.send(heroes)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get heroes' })
  }
}
async function getHero(req: Request, res: Response) {
  try {
    const hero = await heroesService.getById(req.params.id)
    res.send(hero)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get code block' })
  }
}

async function updateHero(req: Request, res: Response) {
  try {
    const hero = req.body
    const updatedHero = await heroesService.update(hero)
    res.json(updatedHero)
  } catch (err) {
    res.status(500).send({ err: 'Failed to update hero' })
  }
}

async function addHero(req: Request, res: Response) {
  try {
    const hero = req.body

    const addedHero = await heroesService.add(hero)
    res.json(addedHero)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add hero' })
  }
}

async function removeHero(req: Request, res: Response) {
  try {
    const removedId = await heroesService.remove(req.params.id)
    res.send(removedId)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add hero' })
  }
}
