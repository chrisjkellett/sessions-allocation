import React from 'react';
import classes from '../DeleteBtn/DeleteBtn.css';

const EditBtn = ({ handlers, id }) => {
  return(
    <span className={classes.SmallBtn} onClick={() => handlers.edit(id)}>edit</span>
  )
};

export default EditBtn;