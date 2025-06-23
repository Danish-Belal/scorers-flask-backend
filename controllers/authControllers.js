const jwt = require('jsonwebtoken');
const { hashed, comparePassword } = require('../utils/hash');
const { findUserByEmail, createUser ,updateUserPartial,deleteUser,findUserById} = require('../model/userModel');
require('dotenv').config();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Signup Controller
const signup = async (req, res) => {
  const { name,email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashed(password);
    const newUser = await createUser(name,email, hashedPassword);

    const token = generateToken(newUser.id);

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      return res.status(400).json({ message: 'No user found' });
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: 'Invalid password, try again' });
    }

    const token = generateToken(user.id);
     const { password: _, ...userWithoutPassword } = user;

     res.status(200).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//update User
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await findUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = await hashed(password);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No data provided to update' });
    }

    const updatedUser = await updateUserPartial(id, updates);

    res.json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup, login , updateUserController, deleteUserController };
