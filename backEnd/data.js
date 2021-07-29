const env = require('dotenv').config()
let Mongo={
 port : process.env.PORT || 4000,
 databasename : process.env.DATABASE,
 url : process.env.URL,
 MongoClient :require('mongodb').MongoClient}
 module.exports = Mongo
