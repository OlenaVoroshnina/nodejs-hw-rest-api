const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const authToken = require('./authToken');
const upload = require('./upload');
const sendEmail = require('./sendEmail');

module.exports = {
  validation,
  ctrlWrapper,
  authToken,
  upload,
  sendEmail,
};