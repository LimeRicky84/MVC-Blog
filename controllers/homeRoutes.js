const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
// Get all articles
    try {
        const articleData = await Article.findAll({
            include: User
        })
        const articles = articleData.map((article) => article.get({plain: true}))

        res.render('homepage', {
            articles
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/article/:id', async (req, res) => {
//     // Get a single article
// });
module.exports = router