import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import slideTransition from "../../CSSTransitions/slide.module.css";

import { connect } from "react-redux";

import contactActions from "../../redux/contactActions/contactActions";

function ContactList({ contactsList, onRemoveContact }) {
  return (
    <>
      <TransitionGroup component="ul" className={styles.list}>
        {contactsList.map(({ id, name, number }) => (
          <CSSTransition
            key={id}
            timeout={250}
            unmountOnExit
            classNames={slideTransition}
          >
            <li key={id}>
              <button
                className={styles.button}
                type="button"
                onClick={() => onRemoveContact(id)}
              >
                Delete
              </button>
              {name}: {number}
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}

ContactList.defaultProps = {
  contactsList: [],
  deleteHandler: () => {
    return;
  },
};

ContactList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

const mapDispatchToProps = {
  onRemoveContact: contactActions.remove,
};

const mapStateToProps = (state) => {
  const { items, filter } = state.contacts;

  const visibleContacts = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return {
    contactsList: visibleContacts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
