const router = require('express').Router();
const articleRoutes = require('./articleRoutes')
const commentRoutes = require('./commentRoutes')
const userRoutes = require('./userRoutes')

router.use('/article', articleRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;