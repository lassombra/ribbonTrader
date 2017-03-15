import {Database} from 'database/server';

export default function getUserFromDB(context) {
	if (!context.user) {
		return null;
	}
	if (!context.dbUser) {
		context.dbUser = syncDBUser(context);
	}
	return context.dbUser;
}
async function syncDBUser(context) {
	let dbUser = await Database.User.findOne({where:{googleKey: context.user.id}});
	if (!dbUser) {
		dbUser = await Database.User.create({
			googleKey: context.user.id,
			googlePicture: context.user.image,
			name: context.user.name
		});
		return dbUser;
	} else {
		dbUser = await dbUser.update({
			googlePicture: context.user.image,
			name: context.user.name
		});
		return dbUser;
	}
}