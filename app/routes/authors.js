const express = require('express')
const router = express.Router()

var pg = require('pg')
//Docker compose:
const conn = new pg.Client({ user: 'postgres', host: 'destination_postgres', database: 'destination_db', password: 'McMahon', port: '5432' })
//Local:
//const conn = new pg.Client({ user: 'postgres', host: 'localhost', database: 'destination_db', password: 'McMahon', port: '5432' })
conn.connect()

router.get('/', (req, res) => {
    async function getQuery(res){
        var query = await conn.query("SELECT * FROM \"Authors\"")
        res.render('authors', {records: query})
        res.render('authors', {records: query})
    }
    getQuery(res)
});

router.post('/', (req, res) => {
    console.log(req.body)

    async function getQuery(res){
        var query = await conn.query("SELECT * FROM \"Authors\" WHERE " +
        "first_name LIKE \'%" + req.body.first_name + "%\' " +
        "AND last_name LIKE \'%" + req.body.last_name + "%\' " +
        "AND city_of_origin LIKE \'%" + req.body.city_of_origin + "%\' " )
        //var query = await conn.query("SELECT * FROM \"Users\"")
        res.render('authors', {records: query})
    }
    getQuery(res)
    
});

module.exports = router