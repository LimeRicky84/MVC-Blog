const router = require('express').Router();
const { text } = require('express');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// routes for /api/comment

router.get('/', async (req, res) => {
    try {
        console.log('/api/comment get all route')
    const comments = await Comment.findAll({})
    res.status(200).json(comments)
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/', withAuth, async (req, res) => {
    // withAuth
    try {
        console.log('/api/comment post route')
        if (req.session) {
            const commentData = await Comment.create({
                comment_text: req.body.comment-text,
                article_id: req.body.article_id,
                user_id: req.session.user_id,
            })
            res.status(200).json(commentData)
        }
    } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', withAuth, async (req, res) => {
    // withAuth
    try {
        console.log('/api/comment delete route')
        const commentDelete = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!commentDelete) {
            res.status(404).json ({ message: 'Comment does not exist'})
            return
        }
        res.status(200).json(commentDelete)
    } catch (err) {
        res.status(500).json(err)
      }
})

module.exports = router