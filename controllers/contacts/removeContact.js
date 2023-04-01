const { Contact } = require('../../models/contact');

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.status(200).json(contact);
};
module.exports = removeContact;
