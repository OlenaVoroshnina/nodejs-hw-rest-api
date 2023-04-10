const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: `Email: ${email} in use` });
  }
  const avatarURL = gravatar.url(email);
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashedPassword, subscription, avatarURL, });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    },
  });
};

module.exports = register;
