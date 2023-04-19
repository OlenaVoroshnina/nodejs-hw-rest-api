const express = require('express');
const { validation, ctrlWrapper, authToken, upload } = require('../../middlewares');
const router = express.Router();
const { auth, users } = require('../../controllers');
const { joiRegisterSchema, joiLoginSchema, joiEmailSchema } = require('../../models/user');

router.post('/register', validation(joiRegisterSchema), ctrlWrapper(auth.register));
router.get('/verify/:verificationCode', ctrlWrapper(auth.verifyEmail));
router.post('/verify', validation(joiEmailSchema), ctrlWrapper(auth.resendVerifyEmail));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(auth.login));
router.get('/current', authToken, ctrlWrapper(users.getCurrent));
router.post('/logout', authToken, ctrlWrapper(auth.logout));
router.patch('/avatars', authToken, upload.single('avatar'), ctrlWrapper(users.updateAvatar));

module.exports = router;
