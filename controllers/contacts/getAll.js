const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const {_id} = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  // const {favorites} = req.query;
  const data = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id email");
  res.status(200).json(data);
};
module.exports = getAll;
