const assert = require('chai').assert;

describe('Database ORM Connectoins', function() {
	it('doesn\'t error', function() {
		const Sequelize = require('sequelize');
		var sequelize = new Sequelize(process.env.DATABASE_URL);
		var User = sequelize.define('user', {
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
		return User.sync({force: true}).then(function () {
			// Table created
			return User.create({
				firstName: 'John',
				lastName: 'Hancock'
			});
		}).then(function(user) {
			assert.isOk(user);
		});
	});
});