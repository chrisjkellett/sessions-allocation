import React from 'react';
import classes from './Help.css';
import { Key, KeyWrapper, Logo } from '../../components';

const Help = ({ show }) => {
  return !show ? null :(
    <div className={classes.HelpContainer}>
      <div className={classes.Help}>
        <Logo />
        <p className={classes.P}>Some useful shortcut keys for quick navigation</p>
        <ul>
        <KeyWrapper>
            <Key label={'F1'} /> = show help
          </KeyWrapper>
          <KeyWrapper>
            <Key label={'esc'} /> = close any overlay or form / remove filters
          </KeyWrapper>
          <KeyWrapper>
            <Key label={'shift'} /> + <Key label={'tab'} /> = toggle views
          </KeyWrapper>
          <KeyWrapper>
            <Key label={'shift'} /> + <Key label={'n'} /> = add a new record
          </KeyWrapper>
          <KeyWrapper>
            <Key label={'shift'} /> + <Key label={'q'} /> = show archived sessions (in sessions view)
          </KeyWrapper>
        </ul>
      </div>
    </div>
  )
};

export default Help;