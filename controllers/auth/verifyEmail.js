const { User } = require('../../models');

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  console.log(verificationCode);
  const user = await User.findOne({ verificationCode });
  if (!user) {
    res.status(404).json({ message: `User ${user} not found` });
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: '' });
  res.json({
    status: 'success',
    code: 200,
    ResponseBody: {
      message: 'Verification successful',
    },
  });
};
module.exports = verifyEmail;
