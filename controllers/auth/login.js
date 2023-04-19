const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    res.status(401).json({ message: 'Email or password is wrong' });
  }
  if (!user.verify) {
    res.status(401).json({ message: 'Email not verified' });
  }
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user.id, { token });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: 'starter',
      },
    },
  });
};

module.exports = login;
