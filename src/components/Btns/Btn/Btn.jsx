import React from 'react';

const Btn = ({ label, handler, disabled }) => <button onClick={handler} disabled={disabled}>{label}</button> 

export default Btn;