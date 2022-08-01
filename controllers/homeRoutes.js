const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
// Get all articles
    try {
        const articleData = await Article.findAll({
            include: [
                {
                    model: Comment,
                    include: { model: User },
                },
                { model: User },
            ],
        })
        const articles = articleData.map((article) => article.get({plain: true}))

        res.render('homepage', {
            articles,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/article/:id', async (req, res) => {
    try {
      const articleData = await Article.findByPk(req.params.id, {
        include: [
            {
                model: Comment,
                include: { model: User },
            },

            { model: User },
        ],
    });
  
      const article = articleData.get({ plain: true });
  
      res.render('/article', {
        ...article,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
// redirect user if already logged in
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });


// router.get('/article/:id', async (req, res) => {
//     // Get a single article
// });
module.exports = router