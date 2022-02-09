const { Pool } = require('pg')

const pool = new Pool({ // this will need to change in deployment, replaced by a heroku string
  database: 'safehaven'
})

module.exports = pool

