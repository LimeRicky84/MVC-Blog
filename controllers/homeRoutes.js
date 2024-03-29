const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
// Get all articles
    try {
      console.log('/ get all route')
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
        console.log('this spot1')
        res.render('homepage', {
            articles,
            logged_in: req.session.logged_in,
        })
        console.log('this spot2')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/article/:id', async (req, res) => {
    try {
      console.log('/ get one route')
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
  
      res.render('\article', {
        ...article,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
// redirect user if already logged in
console.log('/ redirect to login route')
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      console.log('/ redirect from signup route')
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

module.exports = router