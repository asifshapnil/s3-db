const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const sequelize = require("../../config/lib/sequelize");

dotenv.config();

let parkingModel = {
  name: "parkings",
  db_properties: {
    parking_id: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
    },
  },
  db_schema: {
    schema: `${process.env.SCHEMA}`,
    tableName: "parkings",
    timestamps: true,
    createdAt: "created_at",
    charset: "utf8",
    collate: "utf8_unicode_ci",
  },
};

const Parking = sequelize.databaseConnector.define(
  parkingModel.name,
  parkingModel.db_properties,
  parkingModel.db_schema
);


module.exports = Parking;
