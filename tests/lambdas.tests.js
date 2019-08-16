const expect = require('chai').expect;
const faker = require('faker');
const moment = require('moment');

const database = require('../lambda/db-maintenance/index').database;
const dbMaintenance = require('../lambda/db-maintenance/index').handler;
const Friend = require('../lambda/db-maintenance/index').Friend;

describe('Lambda Function Tests', () => {
	before(async () => {
		await database.connect(
			process.env.BT_MONGO_ENDPOINT || 'mongodb://localhost/dev',
			{
				autoIndex: false,
				family: 4,
				useNewUrlParser: true
			});
	
		const friends = [
			new Friend({
				user: faker.internet.userName(),
				friend: faker.internet.userName(),
				approved: true,
				requestedOn: faker.date.past(5),
				evaluatedOn: moment().subtract(30, 'd')
			}),
			new Friend({
				user: faker.internet.userName(),
				friend: faker.internet.userName(),
				approved: false,
				requestedOn: faker.date.past(5),
				evaluatedOn: moment().subtract(30, 'd')
			}),
			new Friend({
				user: faker.internet.userName(),
				friend: faker.internet.userName(),
				approved: false,
				requestedOn: faker.date.past(5),
				evaluatedOn: moment().subtract(30, 'm')
			}),
			new Friend({
				user: faker.internet.userName(),
				friend: faker.internet.userName(),
				requestedOn: faker.date.past(5)
			})
		];

		await Friend.deleteMany({});
		await Friend.insertMany(friends);
		await database.connection.close();
	});

	after(async () => {
		await Friend.deleteMany({});
		await database.connection.close();
	});

	it('Will delete rejected friend requests', async () => {
		await dbMaintenance();
		await database.connect(
			process.env.BT_MONGO_ENDPOINT || 'mongodb://localhost/dev',
			{
				autoIndex: false,
				family: 4,
				useNewUrlParser: true
			});

		const friends = await Friend.find({});
		expect(friends).to.have.lengthOf(3);
	});
});
