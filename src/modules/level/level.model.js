const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const sequelize = require("../../config/lib/sequelize");
const Room = require("../room/room.model");
const Pantry = require("../pantry/pantry.model");

dotenv.config();

let levelModel = {
  name: "levels",
  db_properties: {
    level_id: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
    },
  },
  db_schema: {
    schema: `${process.env.SCHEMA}`,
    tableName: "levels",
    timestamps: true,
    createdAt: "created_at",
    charset: "utf8",
    collate: "utf8_unicode_ci",
  },
};

const Level = sequelize.databaseConnector.define(
  levelModel.name,
  levelModel.db_properties,
  levelModel.db_schema
);

Level.hasMany(Room, {
  as: 'rooms',
  foreignKey: 'levelId'
});

Level.hasOne(Pantry, {
  as: 'pantry',
  foreignKey: 'levelId'
});


module.exports = Level;
