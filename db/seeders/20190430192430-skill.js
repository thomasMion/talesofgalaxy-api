module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Skill',
      [
        {
          name: 'Pilotage',
          description: 'Lorem Ipsum',
          attributeId: 2,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Maniement des armes : pistolet blaster',
          description: 'Lorem Ipsum',
          attributeId: 2,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Maniement des armes : sabre laser',
          description: 'Lorem Ipsum',
          attributeId: 1,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
        {
          name: 'Informatique',
          description: 'Lorem Ipsum',
          attributeId: 5,
          createdAt: '2018-05-14T09:54:16.723Z',
          updatedAt: '2018-05-15T12:12:53.504Z',
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('Skill', null, {}),
};
