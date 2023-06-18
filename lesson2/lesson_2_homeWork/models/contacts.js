const { v4: uuid } = require("uuid");
const { writeDb, readDb } = require("./db");

const listContacts = async () => await readDb();

const getContactById = async (contactId) => {
  const contacts = await readDb();

  return contacts.find(({ id }) => id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readDb();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex !== -1) {
    const contact = contacts.splice(contactIndex, 1);

    await writeDb(contacts);
    return contact;
  }

  return null;
};

const addContact = async (body) => {
  const contacts = await readDb();

  const newContact = {
    id: uuid(),
    ...body,
  };

  contacts.push(newContact);

  await writeDb(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readDb();

  const foundContactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (foundContactIndex !== -1) {
    contacts[foundContactIndex] = { ...contacts[foundContactIndex], ...body };

    await writeDb(contacts);

    return contacts[foundContactIndex];
  }

  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
