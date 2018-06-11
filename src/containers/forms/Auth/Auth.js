import React, {Component} from 'react';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructAuthState} from '../../../store/constructors/auth';
import {renderForm} from './renders/';
import {updateState, generateObjectForSubmitForm} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {formatInput} from '../validation/utility';
import * as actions from '../../../store/actions/auth';

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
    const userToBeChecked = generateObjectForSubmitForm({...this.state.login});
    this.props.initialiseLogin(this.props.examiners, userToBeChecked);
  }

  render(){
    return(
      <section className={classes.Auth}>
        {renderForm({...this.state.login}, this.inputHandler, this.submitHandler, this.props.error)}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    user: state.auth.session_user,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return{
    initialiseLogin: (examiners, userToBeChecked) => dispatch(actions.initialiseLogin(examiners, userToBeChecked))
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));