const Sequelize = require('sequelize');

export const database = new Sequelize(process.env.DATABASE_URL);