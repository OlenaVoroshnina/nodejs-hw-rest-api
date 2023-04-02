const { Contact } = require('../../models/contact');

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.status(200).json(contact);
};
module.exports = getContactById;
