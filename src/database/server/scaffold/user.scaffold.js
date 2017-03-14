import faker from 'faker';
import {Database} from '../index.js';
export default async function loadUsers() {
	let users = [];
	for (let i = 0; i < 100; i++ ){
		users.push(makeUser(i + 1));
	}
	return await Promise.all(users);
}
function makeUser(id) {
	faker.seed(id);
	return Database.User.create({
		id,
		googleKey: `${id}`,
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		displayedName: faker.random.number() > 10 ? `${faker.name.firstName()} ${faker.name.lastName()}` : null,
		admin: id == 1,
		googlePicture: faker.random.word()
	});
}