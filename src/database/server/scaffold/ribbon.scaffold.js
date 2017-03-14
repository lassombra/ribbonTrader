import faker from 'faker';
import {Database} from '../index.js';
export default async function loadRibbons() {
	let ribbons = [];
	for (let i = 0; i < 100; i++ ){
		ribbons.push(makeRibbon(i + 1));
	}
	return await Promise.all(ribbons);
}
function makeRibbon(id) {
	faker.seed(id);
	let ribbon = Database.Ribbon.build({
		id,
		image: faker.random.word(),
		description: faker.random.words(10),
		title: faker.random.word()
	});
	return Database.User.findOne({where: {id: faker.random.number(99) + 1}})
		.then(user => ribbon.setOwner(user))
		.then(() => Database.Tag.findOne({where: {id: faker.random.number(4) + 1}}))
		.then(tag => ribbon.setAvailabilityTypes([tag]))
		.then(() => ribbon.save());
}