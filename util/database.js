const mysql=require("mysql2")

const pool=mysql.createPool({
    host:'localhost',
    user:"root",
    database:"testdb",
    password:"Piyush@nyc85"
})


module.exports=pool.promise()