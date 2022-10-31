const async = require("async");
const dotenv = require("dotenv");
const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const excelToJson = require("convert-excel-to-json");

dotenv.config();


async function init() {

    const sequelize = require("./src/config/lib/sequelize");

    const User = require("./src/modules/user/user.model");
    const Building = require("./src/modules/building/building.model");
    const Level = require("./src/modules/level/level.model");
    const Room = require("./src/modules/room/room.model");
    const Parking = require("./src/modules/parking/parking.model");
    const Pantry = require("./src/modules/pantry/pantry.model");


    async function gdsDbStructureSeeder() {
        const database = process.env.POSTGRES_DATABASE
        const schema = process.env.SCHEMA;

        await sequelize.databaseConnector.query(
            `CREATE DATABASE IF NOT EXISTS "${database}"`
        );

        await sequelize.databaseConnector.query(
            `CREATE SCHEMA IF NOT EXISTS "${schema}"`
        );
        await sequelize.databaseConnector.sync();
    }


    async function gdsDataSeeder() {

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password', salt);

        await User.destroy({ truncate: { cascade: true } });
        const users = await User.bulkCreate(
            [
                {
                    user_id: uuid(),
                    first_name: 'test',
                    last_name: 'user',
                    userName: 'testuser',
                    email: 'test@zuorder.com',
                    address: 'test address',
                    password: password,
                    phone_number: '459757234',
                    roles: ['admin', 'outletAdmin'],
                }
            ]
        );
        console.log("user seeding done.");

    }




    async function dataOperations() {
        console.log("Starting...");
        // data operations
        console.log('data operation done...');
    }

    async.waterfall([gdsDbStructureSeeder, gdsDataSeeder, dataOperations], function (err) {
        // async.waterfall([dataOperations], function (err) {
        if (err) console.error(`Please check the error ${err}`);
        else console.info("DB seed completed!");
        process.exit();
    });
}

init();
