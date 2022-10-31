const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const sequelize = require("../../config/lib/sequelize");

dotenv.config();

let roomModel = {
  name: "rooms",
  db_properties: {
    level_id: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
    },
  },
  db_schema: {
    schema: `${process.env.SCHEMA}`,
    tableName: "rooms",
    timestamps: true,
    createdAt: "created_at",
    charset: "utf8",
    collate: "utf8_unicode_ci",
  },
};

const Room = sequelize.databaseConnector.define(
  roomModel.name,
  roomModel.db_properties,
  roomModel.db_schema
);


module.exports = Room;
