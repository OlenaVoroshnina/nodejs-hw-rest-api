const express = require('express');
const { validation, ctrlWrapper, authToken } = require('../../middlewares');
const router = express.Router();
const { auth, users } = require('../../controllers');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

router.post('/register', validation(joiRegisterSchema), ctrlWrapper(auth.register));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(auth.login));
router.get('/current', authToken, ctrlWrapper(users.getCurrent));
router.post('/logout', authToken, ctrlWrapper(auth.logout));

module.exports = router;
