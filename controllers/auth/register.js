const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../models');
const { sendEmail } = require('../../middlewares');
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: `Email: ${email} in use` });
  }
  const avatarURL = gravatar.url(email);
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(hashedPassword);
  const verificationCode = uuidv4();
  console.log(verificationCode);
  const result = await User.create({
    email,
    password: hashedPassword,
    subscription,
    avatarURL,
    verify: false,
    verificationCode,
  });
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href=${`http://localhost:3000/api/users/verify/${verificationCode}`}> Click to verify your email</a>`,
  };
  await sendEmail(verifyEmail);

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
