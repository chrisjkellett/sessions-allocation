import React, {Component} from 'react';
import classes from './Auth.css';
import {constructAuthState} from '../../../store/constructors/auth';
import {renderForm} from './renders/';

class Auth extends Component{
  state = {
    login: constructAuthState(),
    error: false
  }


  render(){
    return(
      <section className={classes.Auth}>
        {renderForm({...this.state.login})}
      </section>
    )
  }
}

export default Auth;