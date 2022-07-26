const { Article } = require('../models');

const articleData = [
    {
        title: "If The Romans Had This One Piece Of Tech, We'd Have Already Been To Mars",
        article_description: "Go ahead, accuse me of clickbait. I totally deserve it.",
        article_content: "You people will click on anything, won't you?",
    },
];

const seedArticles = () => Article.bulkCreate(articleData);

module.exports = seedArticles;