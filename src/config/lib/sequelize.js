const Sequelize = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();


const postgresConnectionUri = process.env.POSTGRES_CONNECTION_URI;
const postgresDatabase = process.env.POSTGRES_DATABASE;



exports.databaseConnector = new Sequelize(`${postgresConnectionUri}/${postgresDatabase}`, { logging: false });
