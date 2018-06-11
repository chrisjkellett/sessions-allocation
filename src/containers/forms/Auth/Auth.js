import React, {Component} from 'react';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
    this.setState(update);
  }

  submitHandler = (event) => {
    event.preventDefault();
    console.log('submit');
  }

  render(){
    return(
      <section className={classes.Auth}>
        {renderForm({...this.state.login}, this.inputHandler, this.submitHandler)}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.examiners
  }
}

export default withRouter(connect(mapStateToProps)(Auth));