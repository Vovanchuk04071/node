const { join } = require("path");
const fs = require("fs/promises");

const readDb = async () => {
  const result = await fs.readFile(join(__dirname, "contacts.json"), "utf-8");

  return JSON.parse(result);
};

const writeDb = async (data) =>
  await fs.writeFile(
    join(__dirname, "contacts.json"),
    JSON.stringify(data, null, 2)
  );

module.exports = {
  readDb,
  writeDb,
};
