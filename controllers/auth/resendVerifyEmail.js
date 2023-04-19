const { User } = require('../../models');
const { BASE_URL } = process.env;
const { sendEmail } = require('../../middlewares');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: `User ${user} not found` });
  }
  if (user.verify) {
    res.json({
      status: 'Bad Request',
      code: 400,
      ResponseBody: {
        message: 'Verification has already been passed',
      },
    });
  }
  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationCode}" target="_blank"> Click to verify your email</a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    status: 'success',
    code: 200,
    ResponseBody: {
      message: 'Verification email sent',
    },
  });
};
module.exports = resendVerifyEmail;
