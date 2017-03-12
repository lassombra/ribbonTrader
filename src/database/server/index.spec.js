const assert = require('chai').assert;
const Sequelize = require('sequelize');

describe('Database ORM Connectoins', function() {
	it('doesn\'t error', async function() {
		db = require('./index.js');
		User = db.define('user', {
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

		result = await User.sync({force: true}).then(function () {
			// Table created
			return User.create({
				firstName: 'John',
				lastName: 'Hancock'
			});
		});
		assert.isOk(result);
	});
});