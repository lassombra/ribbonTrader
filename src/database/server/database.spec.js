const assert = require('chai').assert;

describe('Database ORM Connections', function() {
	it('doesn\'t error', async function() {
		const sequelize = require('./database.js').database;
		const Sequelize = require('sequelize');
		const User = sequelize.define('test-user', {
			firstName: {
				type: Sequelize.STRING,
				field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
			},
			lastName: {
				type: Sequelize.STRING
			}
		}, {
			freezeTableName: true // Model tableName will be the same as the model name
		});
		assert.isOk(sequelize);
		await User.sync({force: true});
		let user = await User.create({
			firstName: 'John',
			lastName: 'Hancock'
		});
		assert.propertyVal(user, 'firstName', 'John');
		assert.propertyVal(user, 'lastName', 'Hancock');
	});
});