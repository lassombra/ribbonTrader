import {database} from '../database';
import Sequelize from 'sequelize';

export const Tag = database.define('availabilityType', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	description: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	}
});