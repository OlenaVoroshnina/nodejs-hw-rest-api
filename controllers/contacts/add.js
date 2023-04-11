const fs = require('fs/promises');
const { Contact } = require('../../models/contact');
// const path = require('path');

// const avatarsDir = path.join(__dirname, "public", "avatars");


const add = async (req, res) => {
  // const {path: tempPath, originalname} = req.file;
  // const resultUpload = path.join(avatarsDir, originalname);
  // await fs.rename(tempPath, resultUpload);
  const {_id} = req.user;
  const contact = await Contact.create({...req.body, owner: _id});
  console.log(contact);
  res.status(201).json(contact);
};
module.exports = add;
