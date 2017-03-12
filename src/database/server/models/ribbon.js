import {database} from '../database';
const Sequelize = require('sequelize');

export const Ribbon = database.define('ribbon', {
	image: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING(1200)
	}
});

export const waitSync = Ribbon.sync({force:true});