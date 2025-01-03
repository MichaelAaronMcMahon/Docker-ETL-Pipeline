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
        var query = await conn.query("SELECT * FROM \"Users\" ORDER BY id")
        res.render('users', {records: query})
        res.render('users', {records: query})
    }
    getQuery(res)
});

router.post('/', (req, res) => {
//app.post('/users', (req, res) => {
    console.log(req.body)
    if(req.body.action == "search"){
        async function getQuery(res){
            if(req.body.id != ''){
                var query = await conn.query("SELECT * FROM \"Users\" WHERE id = " + req.body.id)
                res.render('users', {records: query})
            }
            var query = await conn.query("SELECT * FROM \"Users\" WHERE " +
            "first_name LIKE \'%" + req.body.first_name + "%\' " +
            "AND last_name LIKE \'%" + req.body.last_name + "%\' " +
            "AND email LIKE \'%" + req.body.email + "%\' " +
            "AND fav_author_first_name LIKE \'%" + req.body.fav_author_first_name + "%\' " +
            "AND fav_author_last_name LIKE \'%" + req.body.fav_author_last_name + "%\' ORDER BY id")
            //var query = await conn.query("SELECT * FROM \"Users\"")
            res.render('users', {records: query})
        }
        getQuery(res)
    }
    else if(req.body.action == "insert"){
        async function insert(res){
            conn.query("INSERT INTO \"Users\" (id, first_name, last_name, email, date_of_birth, fav_author_first_name, fav_author_last_name) VALUES (\'" + 
                req.body.id + "\', \'" + req.body.first_name + "\', \'" + req.body.last_name + "\', \'" + 
                req.body.email + "\', \'" + req.body.date_of_birth + "\', \'" + req.body.fav_author_first_name + "\', \'" + 
                req.body.fav_author_last_name + "\')")
                .then(res => {
                    console.log('Inserted row:', res.rows[0]);
                  })
                  .catch(err => {
                    console.error('Error inserting row:', err);
                  })
            var query = await conn.query("SELECT * FROM \"Users\" ORDER BY id")
            res.render('users', {records: query})
        }
        insert(res)
    }
    else if(req.body.action == "delete"){
        async function deleteRow(res){
            conn.query("DELETE FROM \"Users\" WHERE id = " + req.body.id)
                .then(res => {
                    console.log('Deleted row:', res.rows[0]);
                  })
                  .catch(err => {
                    console.error('Error Deleting row:', err);
                  })
            var query = await conn.query("SELECT * FROM \"Users\" ORDER BY id")
            res.render('users', {records: query})
        }
        deleteRow(res)
    }
    else if(req.body.action == "update"){
        async function update(res){
            if(req.body.id != ''){
                if(req.body.first_name != '') conn.query("UPDATE \"Users\" SET first_name = \'" + req.body.first_name + "\' WHERE id = " + req.body.id)
                if(req.body.last_name != '') conn.query("UPDATE \"Users\" SET last_name = \'" + req.body.last_name + "\' WHERE id = " + req.body.id)
                if(req.body.email != '') conn.query("UPDATE \"Users\" SET email = \'" + req.body.email + "\' WHERE id = " + req.body.id)
                if(req.body.date_of_birth != '') conn.query("UPDATE \"Users\" SET date_of_birth = \'" + req.body.date_of_birth + "\' WHERE id = " + req.body.id)
                if(req.body.fav_author_first_name != '' && req.body.fav_author_last_name != ''){
                    conn.query("UPDATE \"Users\" SET fav_author_first_name = \'" + req.body.fav_author_first_name +
                        "\', fav_author_last_name = \'" + req.body.fav_author_last_name + "\' WHERE id = " + req.body.id)
                        .then(res => {
                            console.log('Deleted row:', res.rows[0]);
                          })
                          .catch(err => {
                            console.error('Error Deleting row:', err);
                          })
                }
                //conn.query("UPDATE \"Users\" SET WHERE id = " + req.body.id)
                var query = await conn.query("SELECT * FROM \"Users\" ORDER BY id")
                res.render('users', {records: query})
            }
        }
        update(res)
    }
    
})

module.exports = router