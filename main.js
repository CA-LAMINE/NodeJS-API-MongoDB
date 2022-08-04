/*----------------------------------------------------------------------------*/
// MAIN.JS
/*----------------------------------------------------------------------------*/

// imports
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const func = require('./func.js')

// initialisation
const app = express()
const url = "mongodb://localhost:27017/"
const dbName = "sense"
const dht22Collec = "dht22"
let db

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.json())


MongoClient.connect(url+dbName, function(err, client) {
  if (err) throw err; // handles connection issues
  console.log("Connected to DB: "+dbName)
  db = client.db(dbName)
})



// GET /dht22 function
app.get('/dht22', async (req,res) => { //check
    try {
        const docs = await db.collection(dht22Collec).find({}).toArray()
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

// GET /dht22/:date function
app.get('/dht22/:date', async (req,res) => { //check
    const date = req.params.date
    try {
        const docs = await db.collection(dht22Collec).find({date}).toArray()
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

// POST /dht22 function
app.post('/dht22', async (req,res) => { //check
    try {
        const body = req.body
        const docs = await db.collection(dht22Collec).insertOne(body)
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }

})

// PATCH /dht22/date/time function
app.patch('/dht22/:date/:time', async (req,res) => {
    try {
        const date = req.params.date
        const time = parseInt(req.params.time)
        const body = req.body
        const docs = await db.collection(dht22Collec).updateOne({date,time}, {$set: {temperature: body.temperature, humidity: body.humidity}}, {upsert:true})
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

// DELETE /dht22 function
app.delete('/dht22/:date/:time', async (req,res) => { //check
    try {
        const date = req.params.date
        const time = parseInt(req.params.time)
        const docs = await db.collection(dht22Collec).deleteOne({date,time})
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.listen(8080, () => {
    console.log("Listening to: localhost:8080")
})
/*



*/
