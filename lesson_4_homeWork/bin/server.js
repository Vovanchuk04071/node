const app = require("../app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3005 } = process.env;
console.log(DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
