import React, {Component} from 'react';
import classes from './Auth.css';
import {constructAuthState} from '../../../store/constructors/auth';
import {renderForm} from './renders/';
import {updateState} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {formatInput} from '../validation/utility';

class Auth extends Component{
  state = {
    login: constructAuthState(),
    error: false
  }

  inputHandler = (event, id) => {
    const {value} = event.target;
    const type = Object.keys({...this.state})[0];
    const update = updateState(this.state, id, {value: formatInput(value, id)}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    console.log(update);
    this.setState(update);
  }

  render(){
    return(
      <section className={classes.Auth}>
        <form>
        {renderForm({...this.state.login}, this.inputHandler)}
        </form>
      </section>
    )
  }
}

export default Auth;