import React from 'react';

const AddNewBtn = ({ showForm, openForm }) => {
  return !showForm && <button onClick={openForm}>add new venue</button> 
}

export default AddNewBtn;