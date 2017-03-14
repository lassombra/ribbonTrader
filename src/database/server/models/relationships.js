import {Ribbon} from './ribbon';
import {User} from './user';

Ribbon.belongsTo(User, {
	as: 'Owner',
	foreignKey: {
		allowNull: false
	}
});
User.hasMany(Ribbon, {as: 'Owner'});