import {expect} from 'chai';
import {Ribbon} from './ribbon';
import scaffold from '../database.scaffold';

describe('Ribbon ORM', function() {
	before(async function() {
		this.timeout(5000);
		await scaffold();
	});
	it('has image from S3');
	it('has tags');
	it('has description', async function() {
		this.timeout(5000);
		let ribbon = await Ribbon.findOne({where: {description: 'Some ribbon here'}});
		expect(ribbon).to.exist;
	});
});