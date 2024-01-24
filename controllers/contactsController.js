const Contact = require('../models/contact');
const { filterContacts, sortContacts, Pager } = require('@npmcli/fs');

// Sample data: Array of Contact objects
let contacts = [
  new Contact('1', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', '1990-01-01'),
  new Contact('2', 'Jane', 'Doe', 'jane.doe@example.com', '234-567-8901', '1991-02-01'),
  new Contact('3', 'Alice', 'Smith', 'alice.smith@example.com', '345-678-9012', '1992-03-02'),
  new Contact('4', 'Bob', 'Johnson', 'bob.johnson@example.com', '456-789-0123', '1993-04-03'),
  new Contact('5', 'Carol', 'Davis', 'carol.davis@example.com', '567-890-1234', '1994-05-04')
];

// CRUD Operations

// Get all contacts
exports.getAllContacts = (req, res) => {
  const { page = 1, limit = 10, sortBy, order } = req.query;
  
  let resultContacts = filterContacts(contacts, req.query);

  if (sortBy) {
    resultContacts = sortContacts(resultContacts, sortBy, order);
  }

  const paginatedContacts = new Pager(resultContacts, parseInt(page), parseInt(limit)).getPaginatedData();
  res.json(paginatedContacts);
};

// Get a single contact by ID
exports.getContactById = (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send('Contact not found');
  }
};

// Create a new contact
exports.createContact = (req, res) => {
  const newContact = new Contact(
    Date.now().toString(), // Generating a simple unique ID
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.phone,
    req.body.birthday
  );
  contacts.push(newContact);
  res.status(201).json(newContact);
};

// Update a contact
exports.updateContact = (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (contact) {
    contact.firstName = req.body.firstName || contact.firstName;
    contact.lastName = req.body.lastName || contact.lastName;
    contact.email = req.body.email || contact.email;
    contact.phone = req.body.phone || contact.phone;
    contact.birthday = req.body.birthday || contact.birthday;
    res.json(contact);
  } else {
    res.status(404).send('Contact not found');
  }
};

// Delete a contact
exports.deleteContact = (req, res) => {
  const index = contacts.findIndex(c => c.id === req.params.id);
  if (index > -1) {
    contacts.splice(index, 1);
    res.send('Contact deleted');
  } else {
    res.status(404).send('Contact not found');
  }
};
