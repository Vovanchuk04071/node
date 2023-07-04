const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers");

const getAl = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite = false } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contacts.find({ owner: _id, favorite }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "_id name email phone");

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { contacts },
  });
};

module.exports = getAl;
