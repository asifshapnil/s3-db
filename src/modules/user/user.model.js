const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const sequelize = require("../../config/lib/sequelize");

dotenv.config();

let usermodel = {
  name: "users",
  db_properties: {
    user_id: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING,
    },
    first_name: {
      allowNull: true,
      unique: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    userName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    birthDay:{
      allowNull: true,
      type: DataTypes.DATE
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING
    },
    customerType: {
      allowNull: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING(10000),
    },
    phone_number: {
      allowNull: true,
      type: DataTypes.STRING(),
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING(),
    },
    roles: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    permissions: {
      allowNull: true,
      type: DataTypes.JSON,
    },
  },
  db_schema: {
    schema: `${process.env.SCHEMA}`,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    charset: "utf8",
    collate: "utf8_unicode_ci",
  },
};

const User = sequelize.databaseConnector.define(
  usermodel.name,
  usermodel.db_properties,
  usermodel.db_schema
);


module.exports = User;
