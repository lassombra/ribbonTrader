import {database} from '../database';
const Sequelize = require('sequelize');

export const User = database.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	googlePicture: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	admin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	displayedName: {
		type: Sequelize.STRING
	},
	sched: {
		type: Sequelize.STRING
	},
	googleKey: {
		type: Sequelize.STRING(21),
		unique: true,
		allowNull: false
	}
});
