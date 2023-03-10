const path = require("path");
const fs = require("fs").promises;


const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    if (!contactId) throw "Please, enter the contact id!";

    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    if (!contactId) throw "Please, enter the contact id!";

    const contacts = await listContacts();
    const newContactsList = JSON.stringify(
      contacts.filter((contact) => contact.id !== contactId)
    );
    await fs.writeFile(contactsPath, newContactsList, "utf8");
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    if (!name || !email || !phone) {
      throw "Please, enter information about contact!";
    }

    const contacts = await listContacts();
    contacts.push({ id: contacts.length + 1 , name, email, phone });
    const newContactsList = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, newContactsList, "utf8");
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};