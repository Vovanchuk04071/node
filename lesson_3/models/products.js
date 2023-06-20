const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: String,
  email: String,
  phone: String,
});

const Product = model("contacts", productSchema);

module.exports = Product;
