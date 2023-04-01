const express = require('express');
const router = express.Router();
const { joiSchema, statusJoiSchema } = require('../../models/contact');
const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const validation = require('../../middlewares/validation');
const { contacts } = require('../../controllers');

router.get('/', ctrlWrapper(contacts.getAll));

router.get('/:contactId', ctrlWrapper(contacts.getContactById));

router.post('/', validation(joiSchema), ctrlWrapper(contacts.add));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(contacts.updateContact));

router.delete('/:contactId', ctrlWrapper(contacts.removeContact));

router.patch(
  '/:contactId/favorite',
  validation(statusJoiSchema),
  ctrlWrapper(contacts.updateStatusContact)
);

module.exports = router;
