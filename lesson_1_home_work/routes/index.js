const Router = require("express");
const router = Router();

const contactsModule = require("../contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsModule.listContacts();
      console.table(contacts);
      break;

    case "get":
      console.table(await contactsModule.getContactById(id));
      break;

    case "add":
      await contactsModule.addContact(name, email, phone);
      break;

    case "remove":
      await contactsModule.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = { router };
