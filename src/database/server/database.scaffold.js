import {database} from './database';
import {Tag, User, Ribbon} from './models';
import createUsers from './scaffold/user.scaffold';
import createTags from './scaffold/tag.scaffold';
import createRibbons from './scaffold/ribbon.scaffold';

let run = false;
export default function scaffold() {
	console.warn('This operation is destructive.  It is meant for tests only and should never be included in or called from production code');
	if (!run) {
		run = Promise.resolve()
			// .then(() => Ribbon.sync())
			// .then(() => User.sync())
			// .then(() => Tag.sync())
			// .then(() => Promise.all([createUsers(), createTags()]))
			// .then(() => createRibbons());
	}
	return run;
}