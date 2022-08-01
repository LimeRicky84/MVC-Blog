const router = require('express').Router();
const { User } = require('../../models')

// routes for /api/user

router.post('/signup', async (req, res) => {
  console.log('1')
  console.log(req.body)
    try {
      console.log('1.5')
        const userData = await User.create( req.body );
        console.log('2')
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
      
            res.status(200).json(userData);
        });
        console.log('3')
    } catch (err) {
        console.log(err.message)
        res.status(400).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
      console.log('1')
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log('2')
        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }
          console.log('3')
          const validPassword = await userData.checkPassword(req.body.password);
      
          if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect email or password, please try again' });
            return;
          }
          console.log('4')
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        console.log('5')
    } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
    });
    } else {
      res.status(404).end();
    }
  });

module.exports = router