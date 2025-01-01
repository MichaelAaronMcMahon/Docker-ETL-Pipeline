const express = require('express')
const router = express.Router()

var pg = require('pg')
//Docker compose:
const conn = new pg.Client({ user: 'postgres', host: 'destination_postgres', database: 'destination_db', password: 'McMahon', port: '5432' })
//Local:
//const conn = new pg.Client({ user: 'postgres', host: 'localhost', database: 'destination_db', password: 'McMahon', port: '5432' })
conn.connect()

router.get('/', (req, res) => {
//app.get('/users', (req, res) => {
    async function getQuery(res){
        var query = await conn.query("SELECT * FROM \"Users\"")
        res.render('users', {records: query})
        res.render('users', {records: query})
    }
    getQuery(res)
});

router.post('/', (req, res) => {
//app.post('/users', (req, res) => {
    console.log(req.body)

    async function getQuery(res){
        if(req.body.id != ''){
            var query = await conn.query("SELECT * FROM \"Users\" WHERE id = " + req.body.id)
            res.render('users', {records: query})
        }
        // else if(req.body.date_of_birth != ''){
        //     var query = await conn.query("SELECT * FROM \"Users\" WHERE date_of_birth = " + req.body.date_of_birth)
        //     res.render('users', {records: query})
        // }
        var query = await conn.query("SELECT * FROM \"Users\" WHERE " +
        "first_name LIKE \'%" + req.body.first_name + "%\' " +
        "AND last_name LIKE \'%" + req.body.last_name + "%\' " +
        "AND email LIKE \'%" + req.body.email + "%\' " +
        "AND fav_author_first_name LIKE \'%" + req.body.fav_author_first_name + "%\' " +
        "AND fav_author_last_name LIKE \'%" + req.body.fav_author_last_name + "%\'")
        //var query = await conn.query("SELECT * FROM \"Users\"")
        res.render('users', {records: query})
    }
    getQuery(res)
    
})

module.exports = router