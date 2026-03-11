const User = require('../models/User');
const cloudinary = require('cloudinary');

// get current user

const getCurrentUser = async (req, res) => {
  try {
    const { _id, name, email, birthday, avatar } = req.user;
    res.status(200).json({
      user: {
        id: _id,
        name,
        email,
        birthday,
        avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedData = {};

    if (name) updatedData.name = name;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'drink-master-app/avatars',
      });
      updatedData.avatar = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true },
    );

    res.status(200).json({
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        birthday: updatedUser.birthday,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// subscribe

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    // sending email (will add nodemailer later)

    res.status(200).json({ message: `${email} subscribed successfully ` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCurrentUser, updateUser, subscribe };
