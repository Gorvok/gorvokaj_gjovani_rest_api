// Function to filter contacts based on query parameters
function filterContacts(contacts, query) {
    return contacts.filter(contact => {
      for (let key in query) {
        if (contact[key] && contact[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  } 
  
  module.exports = filterContacts;
  