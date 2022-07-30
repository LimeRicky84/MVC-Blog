const router = require('express').Router();
const sequelize = require('../config/connection');
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const getArticle = Article.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'date_created',
                'article_description',
                'article_content'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
                    include: {
                    model: User,
                    attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        const articles = (await getArticle).map(article => article.get({ plain: true}))
        res. render('dashboard', { articles, logged_in: true})
    } catch (err) {
    res.status(500).json(err)
    }
})