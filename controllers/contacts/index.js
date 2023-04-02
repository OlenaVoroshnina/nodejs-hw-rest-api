const getAll = require('./getAll');
const getContactById = require('./getContactById');
const add = require('./add');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getAll,
  getContactById,
  add,
  removeContact,
  updateContact,
  updateStatusContact,
};
