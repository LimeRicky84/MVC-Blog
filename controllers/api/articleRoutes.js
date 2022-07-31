const router = require("express").Router();
const { Article, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// routes for /api/article

router.get("/", async (req, res) => {
  try {
    console.log("1");
    const getArticles = await Article.findAll({
      attributes: ["id", "title", "article_description", "date_created"],
      include: [
        {
          model: Comment,
          include: { model: User },
        },
        { model: User },
      ],
    });
    console.log("2");
    res.status(200).json(getArticles);
    console.log("3");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
