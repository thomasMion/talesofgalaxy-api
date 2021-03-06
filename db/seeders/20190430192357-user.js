const bcrypt = require('bcrypt');
const config = require('config');
const safeString = require('../../src/helpers/strings/safeString').default;

module.exports = {
  up: async queryInterface => {
    const password = await bcrypt.hash('password', config.bcrypt.saltRounds);

    queryInterface.bulkInsert(
      'User',
      [
        {
          id: 'd99dead3-923c-583e-96fe-4e18e8299a54',
          name: "L'Observateur",
          get safeName() {
            return safeString(this.name);
          },
          email: 'theobs@talesofgalaxy.fr',
          password,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
          role: 'admin',
        },
        {
          id: '09b3153d-0925-5632-928f-71e06af292f9',
          name: 'Tyrannie',
          get safeName() {
            return safeString(this.name);
          },
          email: 'tyrannie@talesofgalaxy.fr',
          password,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
          role: 'gameMaster',
        },
        {
          id: '07f94576-41d7-51f2-88ff-b8b60d9648b8',
          name: 'Gendja the Hutt',
          get safeName() {
            return safeString(this.name);
          },
          email: 'gendja@talesofgalaxy.fr',
          password,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
          role: 'user',
        },
      ],
      {},
    );
  },
  down: queryInterface => queryInterface.bulkDelete('User', null, {}),
};
