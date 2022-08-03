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
  })
    console.log("2");
    res.status(200).json(getArticles);
    console.log("3");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const articleData = await Article.findOne({
      attributes: ["id", "title", "article_description", "date_created"],
      include: [
        {
          model: Comment,
          include: { model: User },
        },
        { model: User },
      ],
    })
    if (!articleData) {
      res.status(404).json({message: 'Article not found'})
    return;
    }
    res.status(200).json(articleData)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      title: req.body.title,
      article_description: req.body.article_description,
      article_content: req.body.article_content,
      user_id: req.session.user_id
    })
    res.status(200).json(newArticle)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('./:id', withAuth, async (req, res) => {
  try {
    const updateArticle = await Article.update({
      title: req.body.title,
      article_description: req.body.article_description,
      article_content: req.body.article_content
    },
    {
      where: {
        id: req.params.id
      }
    })
    if (!updateArticle) {
      res.status(404).json({ message: 'Article not found'})
      return;
    }
    res.status(200).json(updateArticle)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('./:id', withAuth, async (req, res) => {
  try {
    const deleteArticle = await Article.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteArticle) {
      res.status(404).json({ message: 'Article not found'})
      return;
    }
    res.status(200).json(deleteArticle)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
