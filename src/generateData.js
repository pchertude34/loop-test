const faker = require('faker');

module.exports.generateEntry = function () {
  const id = faker.random.uuid();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const address = faker.address.streetAddress();

  return { id, firstName, lastName, address };
};
