import React from 'react';
import ExamsLogo from '../../../assets/img/logo.png';
import classes from './Logo.css';

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={ExamsLogo} alt='exams logo' />
    </div>
  )
}

export default logo;