const mysql = require('mysql2');
require("dotenv").config(); 
// Create Connection
const db_config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
  port:3306,
  database: process.env.DB
};
module.exports = db_config;