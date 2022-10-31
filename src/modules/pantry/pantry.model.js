const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const sequelize = require("../../config/lib/sequelize");

dotenv.config();

let pantryModel = {
  name: "pantry",
  db_properties: {
    parking_id: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
    },
  },
  db_schema: {
    schema: `${process.env.SCHEMA}`,
    tableName: "pantry",
    timestamps: true,
    createdAt: "created_at",
    charset: "utf8",
    collate: "utf8_unicode_ci",
  },
};

const Pantry = sequelize.databaseConnector.define(
  pantryModel.name,
  pantryModel.db_properties,
  pantryModel.db_schema
);


module.exports = Pantry;
