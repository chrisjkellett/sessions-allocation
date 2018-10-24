import React from 'react';

const Btn = ({ label, handler }) => <button onClick={handler}>{label}</button> 

export default Btn;