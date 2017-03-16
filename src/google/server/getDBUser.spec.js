import getDBUser from './getDBUser';
import {Database} from 'database/server';
import {expect} from 'chai';
describe('get user from db for context', function(){
	let context = {};
	let temporary;
	before(function() {
		return Database.User.findOne({where: {id: 3}})
			.then(user => {context.user = {
				id: user.googleKey,
				name: user.name,
				image: user.googlePicture
			}}).then(() => {
				let temp = getDBUser(context);
				temporary = context.dbUser;
				return temp;
			});
	});
	it('should add user to context', function() {
		expect(context).to.have.property('dbUser');
		expect(context.dbUser).to.be.ok;
	});
	it('should return a promise', function() {
		expect(getDBUser(context)).to.be.a('promise');
	});
	it('should put a promise on context while running', function() {
		expect(temporary).to.exist;
		expect(temporary).to.be.a('promise');
	});
	it('subsequent calls should return the same as the promise stored on context', function(){
		let secondCall = getDBUser(context);
		expect(secondCall).to.exist;
		expect(secondCall).to.equal(context.dbUser);
		expect(secondCall).to.equal(temporary);
	});
});