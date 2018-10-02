import React from 'react';
import classes from './SubTd.css';

const SubTd = ({ data, inline = false }) => {
  const styles = inline ? classes.Inline : null;
  return (
    <div className={styles}>
      {typeof data === "object"
        ? data.map(item => <span key={item} className={classes.Items}>{item}</span>)
        : <span className={classes.Items}>{data}</span>}
    </div>
  )
}



export default SubTd;