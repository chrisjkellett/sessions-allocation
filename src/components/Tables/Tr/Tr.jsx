import React from 'react';
import classes from './Tr.css';

const Tr = ({ key, children, handler, name, selected, disabled, archived }) => {
  const styles = [classes.Row];
  if(handler) styles.push(classes.Selectable);
  if(!disabled && selected) styles.push(classes.Selected);
  if(disabled) styles.push(classes.NotAvailable);
  if(disabled && selected) styles.push(classes.SelectedNotAvailable);
  if(archived) styles.push(classes.Archived);
  return (
    <tr className={styles.join(" ")} onClick={handler ? () => handler(name) : null} key={key}>
      {children}
    </tr>
  )
};

export default Tr;