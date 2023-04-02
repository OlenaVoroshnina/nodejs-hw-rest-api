const { Contact } = require('../../models/contact');

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.status(200).json(contact);
};
module.exports = updateContact;
