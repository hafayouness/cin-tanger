"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Sessions",
      [
        {
          movieId: 1,
          roomId: 1,
          date: "2025-12-25",
          startTime: "18:00",
          price: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 1,
          roomId: 2,
          date: "2025-12-25",
          startTime: "21:00",
          price: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 2,
          roomId: 1,
          date: "2025-12-26",
          startTime: "17:30",
          price: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          movieId: 3,
          roomId: 3,
          date: "2025-12-26",
          startTime: "20:00",
          price: 70,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sessions", null, {});
  },
};
