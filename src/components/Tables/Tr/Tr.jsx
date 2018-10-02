import React from 'react';
import classes from './Tr.css';

const Tr = ({ key, children, handler, name, selected }) => {
  const styles = [classes.Row];
  if(handler) styles.push(classes.Selectable);
  if(selected) styles.push(classes.Selected);

  return (
    <tr className={styles.join(" ")} onClick={handler ? () => handler(name) : null} key={key}>
      {children}
    </tr>
  )
};

export default Tr;