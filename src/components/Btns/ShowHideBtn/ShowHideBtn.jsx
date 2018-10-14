import React from 'react';
import classes from './ShowHideBtn.css';

const ShowHideBtn = ({ handler, label } ) => {
  const active = label ? label.includes('-') : null;
  const styles = [classes.ShowBtn];
  if(active) styles.push(classes.Active);

  return (
    <div className={styles.join(" ")} onClick={handler}>
      { label }
    </div>
  )
}

export default ShowHideBtn;