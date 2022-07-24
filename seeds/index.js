const sequelize = require('../config/connection');
const { Article, Comment, User} = require('../models');

const articleData = require('./articleData.json')
const commentData = require('./commentData.json')
const userData = require('./userData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const project of projectData) {
      await Project.create({
        ...project,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();