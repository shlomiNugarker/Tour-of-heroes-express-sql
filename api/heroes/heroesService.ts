import { Hero } from '../../interfaces/hero'

import DBService from '../../services/dbService'

export default {
  getById,
  query,
  update,
  add,
  remove,
}

async function query(
  criteria: {
    name: string
  } = { name: '' }
) {
  try {
    // var namePart = criteria.name || ''
    const query = `SELECT * FROM hero`

    return DBService.runSQL(query)
  } catch (err) {
    throw err
  }
}

async function getById(heroId: string) {
  try {
    const query = `SELECT * FROM hero WHERE hero.id = ${heroId}`
    const heroes: Hero[] = await DBService.runSQL(query)
    if (heroes.length === 1) return heroes[0]
  } catch (err) {
    throw err
  }
}

async function update(heroToUpdate: Hero) {
  try {
    const query = `UPDATE hero SET name = "${heroToUpdate.name}"
    WHERE hero.id = ${heroToUpdate.id}`

    const okPacket = await DBService.runSQL(query)
    if (okPacket.affectedRows !== 0) return heroToUpdate
    throw new Error(`No hero updated - heroId ${heroToUpdate.id}`)
  } catch (err) {
    throw err
  }
}

async function add(hero: Hero) {
  try {
    const sqlCmd = `INSERT INTO hero (name) 
    VALUES ("${hero.name}")`

    const okPacket = await DBService.runSQL(sqlCmd)

    const lastInserted = await DBService.runSQL(
      `SELECT * from hero where hero.id = ${okPacket.insertId}`
    )
    console.log(lastInserted[0])
    return lastInserted[0]
  } catch (err) {
    throw err
  }
}

async function remove(heroId: string) {
  try {
    const query = `DELETE FROM hero WHERE hero.id = ${heroId}`

    return DBService.runSQL(query).then((okPacket) =>
      okPacket.affectedRows === 1
        ? okPacket
        : Promise.reject(new Error(`No hero deleted - hero id ${heroId}`))
    )
  } catch (err) {
    throw err
  }
}
