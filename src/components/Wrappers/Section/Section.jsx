import React from 'react';
import { bool } from 'prop-types';
import classes from './Section.css';

const Section = ({ showForm, children }) => {
  const styles = showForm ? classes.Section : null
  return (
    <section>
      <div className={styles} />
      {children}
    </section>
  )
};

Section.propTypes = {
  showForm: bool.isRequired
};

export default Section;