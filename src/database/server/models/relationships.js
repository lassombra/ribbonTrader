import {Ribbon} from './ribbon';
import {User} from './user';

console.log(Ribbon, User);
console.log(Ribbon.belongsTo, User.hasMany);
Ribbon.belongsTo(User, {
	foreignKey: {
		nullable: false
	}
});
User.hasMany(Ribbon);