import React from 'react';
import classes from './AddNewBtn.css';

const AddNewBtn = ({ showForm, openForm, label }) => {
  return !showForm && (
    <div className={classes.BtnPanel}>
      <button onClick={openForm}>{label}</button> 
    </div>
  )
}

export default AddNewBtn;