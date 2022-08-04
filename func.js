/*----------------------------------------------------------------------------*/
// METHODS FOR MONGO DB
/*----------------------------------------------------------------------------*/

// create a collection
const createCollection = (name,dbo) => {
  dbo.createCollection(name, function(err, res) {
    if (err) throw err
    console.log("Collection "+name+" created")
    return err
  })
}

// get all data
const getData = (name,dbo) => {
  dbo.collection(name).find({}).toArray(function(err, result) {
    if (err) throw err
    console.log(result)
    return result
  })
}

// insert data
const putData = (name,list,dbo) => {
  dbo.collection(name).insertMany(list, function(err, res) {
    if (err) throw err
    console.log(res)
    return err
  })
}

// drop collection
const delData = (name,dbo) => {
  dbo.dropCollection(name, function(err, del) {
    if (err) throw err;
    if (del) console.log("Collection "+name+" deleted");
    db.close()
  })
}
