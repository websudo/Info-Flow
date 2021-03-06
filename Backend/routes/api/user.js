const express = require('express')
// User Model

const User = require('../../models/User')

const router = express.Router();

/**
 * @route   GET api/users
 * @desc    Get single users
 * @access  Private
 */


 router.get('/', async (req, res) => {

  const userId = req.query.userId;
  try {
    const users = await User.findById( userId);
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router