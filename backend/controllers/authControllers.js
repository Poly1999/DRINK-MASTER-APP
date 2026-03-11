const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// signup

const signup = async (req, res) => {
  try {
    const { name, email, password, birthday } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      birthday,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        birthday: newUser.birthday,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logout

const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, logout };
