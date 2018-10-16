import React from 'react';
import { bool } from 'prop-types';
import classes from './Section.css';

const Section = ({ overlay, children }) => {
  const styles = overlay ? classes.Section : null
  return (
    <section>
      <div className={styles} />
      {children}
    </section>
  )
};

Section.propTypes = {
  overlay: bool.isRequired
};

export default Section;