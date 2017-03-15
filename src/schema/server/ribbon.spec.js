import {expect, should} from 'chai';
import {resolvers} from './ribbon';
import {Database} from 'database/server';
import faker from 'faker';
import scaffold from 'database/server/database.scaffold';
should();
describe('Ribbon schema', function() {
	let authedUser;
	let anotherUsersRibbon;
	before(async function() {
		this.timeout(5000);
		await scaffold();
		await Promise.all([
			Database.User.findOne({where: {id:3}})
				.then(user => authedUser = {id: user.googleKey, image: user.googlePicture, name: user.name}),
			Database.Ribbon.findOne({include: [{
				model: Database.User,
				as: 'Owner',
				where: {id: {$ne: 3}}
			}], subQuery: false})
				.then(ribbon => anotherUsersRibbon = ribbon)
		]);
	});
	it('get one gets the right one', async function() {
		let ribbon = await resolvers.Query.getRibbon(root, {id: 3});
		expect(ribbon).to.exist;
		expect(ribbon).to.have.property('id').which.equals(3);
	});
	it('get all gets a paged result set', async function() {
		let result = resolvers.Query.getRibbons(root, {});
		for (let key in result) {
			result[key] = await result[key];
		}
		result.should.exist;
		result.should.have.property('count').which.is.above(25);
		result.should.have.property('ribbons').which.has.length(25);
	});
	it('get all page:1 gets a paged result set page 2', async function(){
		let result = resolvers.Query.getRibbons(root, {page: 1});
		for (let key in result) {
			result[key] = await result[key];
		}
		let firstRibbon = (await Database.Ribbon.findAll({
			offset: 0,
			limit: 25,
			order: [['updatedAt','DESC']],
			include: [{
				model: Database.User,
				as: 'Owner'
			}, Database.Tag],
			subQuery: false
		}))[0];
		result.should.exist;
		result.should.have.property('count').which.is.above(25);
		result.should.have.property('ribbons').which.has.length(25);
		result.ribbons[0].id.should.not.equal(firstRibbon.id);
	});
	it('find gets a paged result set', async function() {
		let result = resolvers.Query.findRibbons(root, {});
		for (let key in result) {
			result[key] = await result[key];
		}
		result.should.exist;
		result.should.have.property('count').which.is.above(25);
		result.should.have.property('ribbons').which.has.length.at.most(25);
	});
	it('find with tag gets only those tags', async function() {
		let result = resolvers.Query.findRibbons(undefined, {Tags: [{id:2}]});
		for (let key in result) {
			result[key] = await result[key];
		}
		result.should.exist;
		result.should.have.property('count');
		result.should.have.property('ribbons').which.has.length.at.most(25);
		result.ribbons.forEach(ribbon => {
			ribbon.availabilityTypes.filter(type => type.id == 2).should.have.length.above(0);
		});
	});
	it('new creates new if no id, has id', async function() {
		let ribbon = {
			title: faker.random.word(),
			description: faker.random.words(20),
			image: faker.random.word(),
			Tags: [{id:faker.random.number(4)+1}]
		};
		let context = {user: authedUser};
		let result = await resolvers.Mutation.newOrUpdatedRibbon(undefined, {ribbon}, context);
		result.should.have.property('id').which.is.ok;
		result.title.should.equal(ribbon.title);
		result.description.should.equal(ribbon.description);
		result.availabilityTypes.should.have.length.above(0);
	});
	it('update modifies in place', async function() {
		let ribbon = {
			title: faker.random.word(),
			description: faker.random.words(20),
			image: faker.random.word(),
			Tags: [{id:faker.random.number(4)+1}]
		};
		let context = {user: authedUser};
		let {id} = await resolvers.Mutation.newOrUpdatedRibbon(undefined, {ribbon}, context);
		context = {user: authedUser};
		ribbon.id = id;
		ribbon.Tags = [{id:faker.random.number(4)+1}];
		let result = await resolvers.Mutation.newOrUpdatedRibbon(undefined, {ribbon}, context);
		result.should.have.property('id').which.equals(id);
		result.title.should.equal(ribbon.title);
		result.description.should.equal(ribbon.description);
		result.availabilityTypes.should.have.length.above(0);
	});
	it('delete deletes a ribbon', async function() {
		let ribbon = {
			title: faker.random.word(),
			description: faker.random.words(20),
			image: faker.random.word(),
			Tags: [{id:faker.random.number(4)+1}]
		};
		let context = {user: authedUser};
		let {id} = await resolvers.Mutation.newOrUpdatedRibbon(undefined, {ribbon}, context);
		context = {user: authedUser};
		let deleted = await resolvers.Mutation.deleteRibbon(undefined, {id}, context);
		deleted.should.be.ok;
		context = {user: authedUser};
		let retrievedRibbon = await resolvers.Query.getRibbon(undefined, {id}, context);
		expect(retrievedRibbon).to.not.be.ok;
	});
	it('delete doesn\'t delete another users ribbon', async function() {
		let context = {user: authedUser};
		let deleted = await resolvers.Mutation.deleteRibbon(undefined, {id: anotherUsersRibbon.id}, context);
		deleted.should.not.be.ok;
	});
});