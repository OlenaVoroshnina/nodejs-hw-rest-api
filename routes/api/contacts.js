const express = require('express');
const router = express.Router();
const { joiSchema, statusJoiSchema } = require('../../models/contact');
const {validation, ctrlWrapper, authToken } = require('../../middlewares');
const { contacts } = require('../../controllers');

router.get('/', authToken, ctrlWrapper(contacts.getAll));

router.get('/:contactId', ctrlWrapper(contacts.getContactById));

router.post('/', authToken, validation(joiSchema), ctrlWrapper(contacts.add));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(contacts.updateContact));

router.delete('/:contactId', ctrlWrapper(contacts.removeContact));

router.patch(
  '/:contactId/favorite',
  validation(statusJoiSchema),
  ctrlWrapper(contacts.updateStatusContact)
);

module.exports = router;
