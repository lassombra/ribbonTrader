import {expect} from 'chai';
import {Database} from 'database/server';
import {resolvers} from './user';
import faker from 'faker';
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
	it('gets user by id', async function() {
		let user = await resolvers.Query.getCurrentUser(undefined, {id: 3});
		expect(user).to.exist;
		expect(user.id).to.equal(3);
		expect(user.name).to.be.ok;
	});
	it('saves display name for user', async function() {
		let context = {user: {...authedUser}};
		let name = faker.name.firstName();
		let user = await resolvers.Mutation.updateCurrentUser(undefined, {displayedName: name}, context);
		let dbUser = await Database.User.findOne({where: {id: user.id}});
		expect(user).to.be.ok;
		expect(user.displayedName).to.equal(name);
		expect(dbUser.displayedName).to.equal(name);
	});
	it('fails to save display name if not logged in', async function(){
		let name = faker.name.firstName();
		let user = await resolvers.Mutation.updateCurrentUser(undefined, {displayedName: name}, {});
		expect(user).to.not.be.ok;
		expect(user).to.equal(null);
	});
	it('deletes display name (sets to null)', async function(){
		let context = {user: {...authedUser}};
		let name = faker.name.firstName();
		let user = await resolvers.Mutation.updateCurrentUser(undefined, {displayedName: name}, context);
		user = await resolvers.Mutation.updateCurrentUser(undefined, {displayedName: null}, context);
		expect(user.displayedName).to.equal(null);
	});
});