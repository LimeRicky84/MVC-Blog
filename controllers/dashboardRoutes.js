const router = require("express").Router();
// const sequelize = require("../config/connection");
const { Article, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//  routes for /dashboard
router.get("/", withAuth, async (req, res) => {
  // withAuth
  try {
    console.log('/dashboard get article route')
    const getArticle = await Article.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: { model: User },
        },
        { model: User },
      ],
    });
    const articles = getArticle.map((article) => article.get({ plain: true }));
    res.render("dashboard", { articles, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  // withAuth
  try {
    console.log('/dashboard/edit get one route')
    const editArticle = await Article.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Comment,
          include: { model: User },
        },
        { model: User },
      ],
    });
    if (!editArticle) {
      res.status(404).json({ message: "No article found with this id!" });
      return;
    }

    const article = editArticle.get({ plain: true });

    res.render("edit", {
      article,
      logged_in: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/create/", withAuth, async (req, res) => {
  // withAuth
  try {
    console.log('/dashboard/create get all route')
    const createArticle = await Article.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: { model: User },
        },
        { model: User },
      ],
    });
    const articles = createArticle.map((article) =>
      article.get({ plain: true })
    );
    res.render("create", { articles, logged_in: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
