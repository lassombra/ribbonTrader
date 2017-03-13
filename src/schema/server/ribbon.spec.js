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
});