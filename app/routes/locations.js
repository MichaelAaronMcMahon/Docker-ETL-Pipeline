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
        var query = await conn.query("SELECT * FROM \"Locations\"")
        res.render('locations', {records: query})
        res.render('locations', {records: query})
    }
    getQuery(res)
});

router.post('/', (req, res) => {
    console.log(req.body)

    async function getQuery(res){
        var query = await conn.query("SELECT * FROM \"Locations\" WHERE " +
        "city_of_origin LIKE \'%" + req.body.city_of_origin + "%\' " +
        "AND country_of_origin LIKE \'%" + req.body.country_of_origin + "%\'" )
        //var query = await conn.query("SELECT * FROM \"Users\"")
        res.render('locations', {records: query})
    }
    getQuery(res)
    
});

module.exports = router