import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import Storage from './Storage';
import data from './data.json';
import '../App.css';

function App() {
  const storedContacts = localStorage.getItem('contacts');
  const [allContacts, setAllContacts] = useState(storedContacts ? JSON.parse(storedContacts) : data.contacts || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(allContacts));
  }, [allContacts]);

  const handleAddContact = (newContact) => {
    const isContactExist = allContacts.some(
      (contact) => contact.name === newContact.name
    );

    if (isContactExist) {
      alert(`${newContact.name} is already in the contact list`);
    } else {
      const updatedContacts = [
        ...allContacts,
        { ...newContact, id: `id-${allContacts.length + 1}` },
      ];
      setAllContacts(updatedContacts);
    }
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );

    setAllContacts(updatedContacts);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    let visibleContacts = [];

    if (filter !== '') {
      const filterRegex = new RegExp(filter, 'i');
      visibleContacts = allContacts.filter((contact) => filterRegex.test(contact.name));
    } else {
      visibleContacts = allContacts;
    }

    // Remove any duplicate contacts
    const uniqueContacts = [];
    visibleContacts.forEach((contact) => {
      if (!uniqueContacts.some((c) => c.name === contact.name)) {
        uniqueContacts.push(contact);
      }
    });

    return uniqueContacts;
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className="phonebox">
      <h1>Phonebook ☎</h1>
      {/* <Storage /> */}
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <SearchFilter filter={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

App.propTypes = {
  allContacts: PropTypes.array,
};

export default App;