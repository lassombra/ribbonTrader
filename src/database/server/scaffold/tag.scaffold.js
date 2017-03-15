import {Database} from '../index';

export default async function loadTags() {
	let tags = ['Trade', 'Special Action', 'Scavenger Hunt', 'Giveaway', 'Special Requirement'];
	tags = tags.map((tag, index) => Database.Tag.create({id: index + 1, description: tag}));
	return await Promise.all(tags);
}