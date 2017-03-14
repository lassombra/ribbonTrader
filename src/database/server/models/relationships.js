import {Ribbon} from './ribbon';
import {User} from './user';
import {Tag} from './tag';

Ribbon.belongsTo(User, {
	as: 'Owner',
	foreignKey: {
		allowNull: false
	}
});
// User.hasMany(Ribbon, {as: 'Owner'});

Ribbon.belongsToMany(Tag, {through: 'RibbonTags'});
Tag.belongsToMany(Ribbon, {through: 'RibbonTags'});