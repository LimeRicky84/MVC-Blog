const { User } = require('../models');

const userData = [
  {
    name: "Rick Moss",
    email: "TheRickestRick@yahoo.com",
    password: "password12345",
  },
  {
    name: "Incredulous Fred",
    email: "Dont@meBro.com",
    password: "password12345",
  },
  {
    name: "Tate the Grate",
    email: "TtGoBro@gmail.com",
    password: "password12345",
  },
  {
    name: "Bobby Boucher",
    email: "Bobino@aol.com",
    password: "password12345",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;