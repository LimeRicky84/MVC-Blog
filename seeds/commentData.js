const { Comment } = require('../models');

const commentData = [
    {
        user_id: 2,
        article_id: 1,
        comment_text: "f***kn clickbait bro",
    },
    {
        user_id: 3,
        article_id: 1,
        comment_text: "get of the internet",
    },
    {
        user_id: 4,
        article_id: 1,
        comment_text: "Wow! Amazeballs!",
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;