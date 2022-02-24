require('dotenv').config()
const { Pool } = require('pg')

module.exports = new Pool({
    user: process.env.PGUSER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PG_PORT,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    ssl: {
        rejectUnauthorized: false
    }
})

