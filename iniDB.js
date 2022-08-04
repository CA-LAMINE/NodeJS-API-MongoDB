const MongoClient = require('mongodb').MongoClient
const data = require('./dht22.json')

const url = "mongodb://localhost:27017/"
const dbName = "sense"
let db

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const createCollection = (name,dbo) => {
  dbo.createCollection(name, function(err, res) {
    if (err) throw err
    console.log("Collection "+name+" created")
  })
}

const putData = (name,list,dbo) => {
  dbo.collection(name).insertMany(list, function(err, res) {
    if (err) throw err
    console.log(res)
  })
}

const delData = (name,dbo) => {
  dbo.dropCollection(name, function(err, del) {
    if (err) throw err;
    if (del) console.log("Collection "+name+" deleted");
  })
}

MongoClient.connect(url+dbName, function(err, client) {
  if (err) throw err; // handles connection issues
  console.log("Connected to DB: "+dbName)
  db = client.db(dbName)

  let choice
  readline.question("1. create collection \"sense\" \n2. insert data \n3. delete data \nchoice: ", choice => {
    switch (choice) {
      case "1":
        createCollection(dbName,db)
        break

      case "2":
        putData(dbName,data,db)
        break

      case "3":
        delData(dbName,db)
        break

      case "q":
        process.exit(1)
        break

      default:
        console.log("nothing for this")
        break;
    }
  })
})


  /*db.createCollection(dbName, function(err, res) {
    if (err) throw err
    console.log("Collection "+dbName+" created")
    client.close()
  })*/

  /*db.collection(dbName).insertMany(data, function(err, res) {
    if (err) throw err
    console.log(res)
    client.close()
  })*/

  /*db.dropCollection(dbName, function(err, del) {
    if (err) throw err;
    if (del) console.log("Collection "+dbName+" deleted");
    client.close()
  })*/
