import {database} from './database';
import {User, Ribbon} from './models';

let run = false;
export default function scaffold() {
	if (!run) {
		run = Promise.resolve()
			.then(() => database.sync({force: true}))
			.then(() => User.create({
				googleKey: 'fakeKey',
				name: 'fake User'
			}))
			.then(user => ({user, ribbon:Ribbon.build({
				description: 'Some ribbon here'
			})}))
			.then(({user, ribbon}) => ribbon.setOwner(user))
			.then(ribbon => ribbon.save());
	}
	return run;
}