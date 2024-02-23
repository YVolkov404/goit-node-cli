const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

//---------------------------------------
program
  .option("-a, --action <type>", "action")
  .option("-i, --id <type>", "id")
  .option("-n, --name <type>", "name")
  .option("-e, --email <type>", "email")
  .option("-p, --phone <type>", "phone");

program.parse();

const options = program.opts();

//---------------------------------------

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      return console.table(contactList);
      break;

    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const appendedContact = await addContact({ name, email, phone });
      return console.log(appendedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
