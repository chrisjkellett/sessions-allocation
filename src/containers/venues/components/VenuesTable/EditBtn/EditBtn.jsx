import React from 'react';
import classes from '../DeleteBtn/DeleteBtn.css';

const EditBtn = ({ handlers, id }) => {
  return(
    <span className={classes.SmallBtn} onClick={() => handlers.editVenueHandler(id)}>edit</span>
  )
};

export default EditBtn;