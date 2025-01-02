console.log('run')
var pg = require('pg')
//Docker compose:
//const conn = new pg.Client({ user: 'postgres', host: 'destination_postgres', database: 'destination_db', password: 'McMahon', port: '5432' })
//Local:
const conn = new pg.Client({ user: 'postgres', host: 'localhost', database: 'destination_db', password: 'McMahon', port: '5432' })
conn.connect()

const userRouter = require("./routes/users")
const authorRouter = require("./routes/authors")
const locationsRouter = require("./routes/locations")

const routers = {
    "users": userRouter,
    "authors": authorRouter,
    "locations": locationsRouter
}

const express = require("express")
const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("index")
});

app.post('/', (req, res) => {
    console.log(req.body["page"])
    
    //app.use("/" + req.body["page"], userRouter)
    //res.redirect("/" + req.body["page"])
    app.use("/" + req.body["page"], routers[req.body["page"]])
    res.redirect("/" + req.body["page"])
});


// app.get('/users', (req, res) => {
//     async function getQuery(res){
//         var query = await conn.query("SELECT * FROM \"Users\"")
//         res.render('users', {records: query})
//         res.render('users', {records: query})
//     }
//     getQuery(res)
// });


//app.use("/users", userRouter)

app.listen(3000)