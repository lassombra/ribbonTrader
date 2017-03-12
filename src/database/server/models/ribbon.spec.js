import {expect} from 'chai';
import {Ribbon, waitSync} from './ribbon';

describe('Ribbon ORM', function() {
	before(async function() {
		expect(waitSync).to.exist;
		await waitSync;
		await Ribbon.create({
			description: 'Some ribbon here'
		});
	});
	it('has image from S3');
	it('has tags');
	it('has description', async function() {
		let ribbon = await Ribbon.findOne({where: {description: 'Some ribbon here'}});
		expect(ribbon).to.exist;
	});
});