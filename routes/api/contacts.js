const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { joiSchema, statusJoiSchema } = require('../../models/contact');
const {validation, ctrlWrapper, authToken } = require('../../middlewares');
const { contacts } = require('../../controllers');

// const path = require('path');
// const tempDir = path.join(__dirname, "temp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 2048
//   }
// });

// const upload = multer({
//   storage: multerConfig,
// });

router.get('/', authToken, ctrlWrapper(contacts.getAll));

router.get('/:contactId', ctrlWrapper(contacts.getContactById));


//upload.fields([{ name: 'file', maxCount: 1 }, { name: 'avatar', maxCount: 4 }]); // multiple files
//upload.array('photos', 10) // якщо ми очікуємо 10 файлов
router.post('/', authToken,  validation(joiSchema), ctrlWrapper(contacts.add));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(contacts.updateContact));

router.delete('/:contactId', ctrlWrapper(contacts.removeContact));

router.patch(
  '/:contactId/favorite',
  validation(statusJoiSchema),
  ctrlWrapper(contacts.updateStatusContact)
);

module.exports = router;
