const express = require('express');
const passport = require('passport');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/protected', passport.authenticate('jwt', { session: false }), UserController.protected);

module.exports = router;
