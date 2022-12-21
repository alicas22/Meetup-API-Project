// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('First name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Last name is required.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });

    user.toJSON()
    const token = await setTokenCookie(res, user);
    return res.json({
      id: user.id,
      firstName,
      lastName,
      username,
      token: token
    }
    );
  }
);


module.exports = router;
