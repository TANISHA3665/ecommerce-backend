const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const TokenService = require('../services/token.service');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/token.util');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return the new user (excluding the password)
    const { password: _, ...userWithoutPassword } = newUser.dataValues;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await TokenService.saveRefreshToken(user.id, refreshToken);

    return res.json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await TokenService.removeRefreshToken(refreshToken);
    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const storedToken = await TokenService.findRefreshToken(refreshToken);
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const decoded = verifyToken(refreshToken);
    const userId = decoded.id;

    const newAccessToken = generateAccessToken(userId);
    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

module.exports = { register, login, logout, refreshToken };
