const { User } = require('../models');

const userData = [
  {
    user_name: "SpaceLord",
    first_name: "Rick",
    last_name: "Moss",
    email: "TheRickestRick@yahoo.com",
    password: "password12345",
  },
  {
    user_name: "IncredulousFred",
    first_name: "Fred",
    last_name: "Stern",
    email: "Dont@meBro.com",
    password: "password12345",
  },
  {
    user_name: "TatetheGrate",
    first_name: "Tate",
    last_name: "Simms",
    email: "TtGoBro@gmail.com",
    password: "password12345",
  },
  {
    user_name: "BobbysKnob",
    first_name: "Bobby",
    last_name: "Boucheir",
    email: "Bobino@aol.com",
    password: "password12345",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;