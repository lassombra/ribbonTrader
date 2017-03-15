import {expect} from 'chai';
import {Database} from 'database/server';
import {resolvers} from './user';
describe('User Schema', function(){
	let authedUser;
	before(function() {
		return Database.User.findOne({where: {id: 3}})
			.then(user => {authedUser = {
				id: user.googleKey,
				name: user.name,
				image: user.googlePicture
			}});
	});
	it('gets current user from context', async function(){
		let context = {user: {...authedUser}};
		let user = await resolvers.Query.getCurrentUser(undefined, undefined, context);
		expect(context).to.have.property('dbUser');
		let dbUser = await context.dbUser;
		expect(dbUser).to.have.property('id');
		expect(dbUser.id).to.equal(3);
		expect(user).to.exist;
		expect(user).to.have.property('id');
		expect(user.id).to.equal(3);
	});
	it('fails logged in user checks if not logged in', async function() {
		let context = {};
		let user = await resolvers.Query.getCurrentUser(undefined, undefined, context);
		expect(context).to.not.have.property('dbUser');
		expect(user).to.not.be.ok;
		expect(user).to.equal(null);
	});
	it('gets user by id');
	it('saves display name for user');
	it('fails to save display name if not logged in');
	it('deletes display name (sets to null)');
});