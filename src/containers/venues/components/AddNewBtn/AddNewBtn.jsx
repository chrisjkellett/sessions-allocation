import React from 'react';
import classes from './AddNewBtn.css';

const AddNewBtn = ({ showForm, openForm }) => {
  return !showForm && (
    <div className={classes.BtnPanel}>
      <button onClick={openForm}>add new venue</button> 
    </div>
  )
}

export default AddNewBtn;