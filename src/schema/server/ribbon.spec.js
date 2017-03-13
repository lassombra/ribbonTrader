import {expect} from 'chai';
import {resolvers} from './ribbon';
import scaffold from 'database/server/models/ribbon.scaffold';

describe('Ribbon schema', function() {
	before(async function() {
		this.timeout(5000);
		await scaffold();
	});
	it('get one gets the right one', async function() {
		let ribbon = await resolvers.Query.getRibbon(undefined, {id: 1});
		expect(ribbon).to.exist;
		expect(ribbon.id).to.equal(1);
	});
	it('create ribbon creates new one with id', async function(){
		let ribbon = await resolvers.Mutation.newRibbon(undefined, {description: 'this is a test description'});
		expect(ribbon).to.have.property('id').which.is.above(1);
	});
	it('get ribbons gets all ribbons in table', async function(){
		let ribbons = await resolvers.Query.getRibbons();
		expect(ribbons).to.have.length.at.least(1);
	})
});