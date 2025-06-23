const {
  upsertProfile,
  getProfileByUserId,
  deleteProfile
} = require('../model/profileMode');

const createOrUpdateProfile = async (req, res) => {
  const userId = req.params.id;
  const data = req.body;

  try {
    const updatedProfile = await upsertProfile(userId, data);
    res.json({ message: 'Profile saved', profile: updatedProfile });
  } catch (err) {
    console.error('Create/Update profile error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ profile });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProfileController = async (req, res) => {
  const userId = req.params.id;

  try {
    await deleteProfile(userId);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    console.error('Delete profile error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfile,
  deleteProfileController,
};
