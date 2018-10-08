import React from 'react';
import classes from './ShowHideBtn.css';

const ShowHideBtn = ({ handler, type, label } ) => {
  const active = label ? label.includes('-') : null;
  const styles = [classes.ShowBtn];
  if(active) styles.push(classes.Active);

  return (
    <div className={styles.join(" ")} onClick={() => handler(type)}>
      { label }
    </div>
  )
}

export default ShowHideBtn;