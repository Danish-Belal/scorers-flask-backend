const express = require('express');
const router = express.Router();
const {
  createOrUpdateProfile,
  getProfile,
  deleteProfileController
} = require('../controllers/profileContoller');

// POST or PUT: create/update
router.post('/create/:id', createOrUpdateProfile); // create or update
router.put('/updateProfile/:id', createOrUpdateProfile);  // same logic

// GET: fetch profile
router.get('/getProfile/:id', getProfile);

// DELETE: delete profile
router.delete('/deleteProfile/:id', deleteProfileController);

module.exports = router;
