const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const sequelize = require("../../config/lib/sequelize");
const Level = require("../level/level.model");
const Parking = require("../parking/parking.model");

dotenv.config();

let buildongModel = {
  name: "buildings",
  db_properties: {
    building_id: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
    },
  },
  db_schema: {
    schema: `${process.env.SCHEMA}`,
    tableName: "buildings",
    timestamps: true,
    createdAt: "created_at",
    charset: "utf8",
    collate: "utf8_unicode_ci",
  },
};

const Building = sequelize.databaseConnector.define(
  buildongModel.name,
  buildongModel.db_properties,
  buildongModel.db_schema
);

Building.hasMany(Level, {
  as: 'levels',
  foreignKey: 'buildingId'
});

Building.hasOne(Parking, {
  as: 'parking',
  foreignKey: 'buildingId'
});


module.exports = Building;
