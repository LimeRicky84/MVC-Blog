const router = require('express').Router();
const { User } = require('../../models')
const withAuth = require('../../utils/auth')

// routes for /api/user

router.post('/signup', async (req, res) => {
    try {
      console.log('/api/user signup route')
        const userData = await User.create( req.body );
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
      
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
      console.log('/api/user login route')
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
              .status(400)
              .json({ message: 'No user with that email' });
            return;
          }
          const validPassword = await userData.checkPassword(req.body.password);
      
          if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect password' });
            return;
          }
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.status(200).send('You are now logged in!');
        });
    } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/logout', (req, res) => {
  console.log('/api/user logout route')
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('/api/user delete user route')
    const userDelete = User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(userDelete)
  } catch (err) {
  res.status(500).json(err)
  }
})

module.exports = router