const mysql=require("mysql2")
const Sequelize = require("sequelize")

const sequelize=new Sequelize('testdb','root','Piyush@nyc85',{dialect:'mysql',host:'localhost'})
/*
const pool=mysql.createPool({
    host:'localhost',
    user:"root",
    database:"testdb",
    password:"Piyush@nyc85"
})
*/

module.exports=sequelize