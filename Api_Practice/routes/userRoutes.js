const express = require('express');
const { signup, signin } = require('../controllers/userController');
const validateToken = require('../middlewares/auth');
const { admindashboard, requireRoles } = require('../controllers/admindashboard');
const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/signin', signin);

userRouter.post('/admin', validateToken, admindashboard);

userRouter.get('/shared', validateToken, requireRoles(['admin', 'user']), (req, res) => {

    res.json({ message: 'Shared endpoint' });

});

module.exports = userRouter;
