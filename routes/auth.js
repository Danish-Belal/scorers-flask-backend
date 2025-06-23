const express = require('express');
const router = express.Router();
const {signup, login, updateUserController, deleteUserController} = require('../controllers/authControllers')


router.post('/signup', signup);
router.post('/login',login);
router.put('/updateUser/:id', updateUserController);
router.delete('/deleteUser/:id', deleteUserController);

module.exports = router;
