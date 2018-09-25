import React from 'react';
import classes from '../DeleteBtn/DeleteBtn.css';

const EditBtn = ({ handler, id }) => {
  return(
    <span className={classes.SmallBtn} onClick={() => handler(id)}>edit</span>
  )
};

export default EditBtn;