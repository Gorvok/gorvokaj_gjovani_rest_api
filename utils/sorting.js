function sortContacts(contacts, sortBy, order = 'asc') {
    return contacts.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  module.exports = sortContacts;
  