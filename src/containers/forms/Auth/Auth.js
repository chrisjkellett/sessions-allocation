import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {constructAuthState} from '../../../store/constructors/auth';
import {renderUI} from './renders/';
import {updateState, forSubmit} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {formatInput} from '../validation/utility';
import * as actions from '../../../store/actions/auth';
import * as routes from '../../../store/app-data/routes';

class Auth extends Component{
  state = {
    login: constructAuthState()
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
    const {authUser} = this.props;
    const user = forSubmit({...this.state.login});
    authUser(Object.assign({...user}, {returnSecureToken: true}));
  }

  render(){
    const {isAuthenticated} = this.props;
    const {login} = this.state;
    if(isAuthenticated)
      return <Redirect to={routes.SESSIONS} />;
    else
      return renderUI({...login}, this.inputHandler, this.submitHandler);
    
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    user: state.auth.session_user,
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authUser: (user) => dispatch(actions.authUser(user))
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));