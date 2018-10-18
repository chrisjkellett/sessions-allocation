import React from 'react';
import classes from './ShowHideBtn.css';

const ShowHideBtn = ({ handler, visible, label }) => {
  const styles = [classes.ShowBtn];
  if(visible) styles.push(classes.Active);

  return(
    <div className={styles.join(" ")} onClick={handler}>
      { !visible 
        ? 'show ' + label 
        : 'hide ' + label
       }
    </div>
  )
}

export default ShowHideBtn;