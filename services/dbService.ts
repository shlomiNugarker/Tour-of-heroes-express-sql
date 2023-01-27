import { Connection, MysqlError, Pool } from 'mysql'

var mysql = require('mysql')

var pool: Pool = mysql.createPool({
  host: '',
  port: 3306,
  user: '',
  password: '',
  database: '',
  insecureAuth: true,
})

pool.on('connection', function (connection: Connection) {
  console.log('DB Connection established')

  connection.on('error', function (err: MysqlError) {
    console.error(new Date(), 'MySQL error', err.code)
  })
  connection.on('close', function (err: MysqlError) {
    console.error(new Date(), 'MySQL close', err)
  })
})

function runSQL(sqlCommand: any) {
  return new Promise((resolve, reject) => {
    pool.query(sqlCommand, function (error: unknown, results: any) {
      if (error) reject(error)
      else resolve(results)
    })
  })
}

module.exports = {
  runSQL,
}
