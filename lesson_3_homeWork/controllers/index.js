const add = require("./contacts/add");
const getAll = require("./contacts/getAll");
const getById = require("./contacts/getById");
const updateById = require("./contacts/updateById");
const removeById = require("./contacts/removeById");
const updateStatus = require("./contacts/updateStatus");

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  removeById,
  updateStatus,
};
