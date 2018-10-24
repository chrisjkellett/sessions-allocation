import React from 'react';

const AddNewBtn = ({ showForm, openForm, label }) => {
  return !showForm && (
    <button onClick={openForm}>add new {label}</button> 
  )
}

export default AddNewBtn;