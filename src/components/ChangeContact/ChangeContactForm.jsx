import React, { useState } from 'react';
import { Box } from '../../Utils/Box';
import {
  ContactFrm,
  FormLabel,
  FormInput,
  FormBtn,
} from './ContactForm.styled';
import PropTypes from 'prop-types';

import {
  useChangeContactsMutation,
  useFetchContactsQuery,
} from 'Redux/contacts/contactsOperations';

export const ChangeContactForm = ({ id, toggleModal }) => {
  const [setNewContact] = useChangeContactsMutation();
  const { data } = useFetchContactsQuery();

  const [name, setName] = useState(() => {
    const contact = data?.find(contact => contact.id === id);
    return contact?.name;
  });
  const [number, setNumber] = useState(() => {
    const contact = data?.find(contact => contact.id === id);
    return contact?.number;
  });

  // Responsible for updating the state
  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return console.warn(`No ${name} options`);
    }
  };

  // Called when the form is submitted
  const handleSubmit = async evt => {
    evt.preventDefault();
    const contactToChange = {
      name,
      number,
      id,
    };
    try {
      await setNewContact(contactToChange);
    } catch (err) {
      console.log(err);
    }
    reset();
    toggleModal();
  };

  // Reset the form inputs
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Box border="contactForm" padding={5} width="400px">
      <ContactFrm onSubmit={handleSubmit}>
        <FormLabel>
          Name
          <FormInput
            value={name}
            onChange={handleInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormLabel>

        <FormLabel>
          Number
          <FormInput
            value={number}
            onChange={handleInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormLabel>

        <FormBtn variant="contained" aria-label="add contact" type="submit">
          Change contact
        </FormBtn>
      </ContactFrm>
    </Box>
  );
};

ChangeContactForm.propTypes = {
  id: PropTypes.string,
  toggleModal: PropTypes.func,
};
