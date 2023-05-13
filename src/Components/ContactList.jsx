import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList:[],
    };
  }

  componentDidMount() {
    this.updateContactList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.props.contacts) {
      this.updateContactList();
    }
  }

  updateContactList() {
    const { contacts } = this.props;
    const contactList = contacts.map((contact) => {
      return contact.id ? contact : { ...contact, id: nanoid() };
    });
    this.setState({ contactList });
  }

  handleDeleteClick = (id) => {
    const updatedContactList = this.state.contactList.filter((contact) => contact.id !== id);
    this.setState({ contactList: updatedContactList });
    this.props.onDeleteContact(id);
  };
  

  render() {
    const { contactList } = this.state;
    return (
      <ul>
        {contactList.map((contact) => (
          <li key={nanoid()}>
            {contact.name} : {contact.number}
            <button onClick={() => this.handleDeleteClick(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  } 
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
