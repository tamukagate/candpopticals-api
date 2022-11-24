const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json('Wrong credentials');

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.JWT_SEC
    );

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json('Wrong credentials');

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
