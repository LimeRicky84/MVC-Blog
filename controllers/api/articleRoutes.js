const router = require('express').Router();
const { Article, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// routes for /api/article

router.get('/', async (req, res) => {
    try {
        const getArticles = Article.findAll({
            attributes: [
                'id',
                'title',
                'article_description',
                'date_created'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'article_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                },
            ]
        })
        res.status(200).json(projectData);
    } catch  (err) {
        res.status(500).json(err);
    }
})

module.exports = router