const { Contact } = require('../../models/contact');

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;
  const { favorite } = body;
  const contact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
  if (!body.favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json(contact);
};
module.exports = updateStatusContact;
