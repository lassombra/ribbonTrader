import {database} from '../database';
const Sequelize = require('sequelize');
import {Ribbon} from './ribbon';

export const User = database.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	picture: {
		type: Sequelize.STRING
	},
	name: {
		type: Sequelize.STRING
	},
	sched: {
		type: Sequelize.STRING
	},
	googleKey: {
		type: Sequelize.STRING(21),
		unique: true
	}
});
