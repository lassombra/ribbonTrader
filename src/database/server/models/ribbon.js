import {database} from '../database';
const Sequelize = require('sequelize');

export const Ribbon = database.define('ribbon', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	image: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING(1200)
	}
});

export const waitSync = Ribbon.sync();