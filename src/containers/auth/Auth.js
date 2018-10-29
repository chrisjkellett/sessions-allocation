import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import { constructAuthState } from '../../store/constructors/auth';
import { updateState, forSubmit } from '../utility';
import {checkValidity} from '../../validation/validation';
import {formatInput} from '../../validation/utility';
import * as actions from '../../store/actions/auth/auth';
import * as routes from '../../store/app-data/routes';
import { Section, Input } from '../../components';
import { generateFormElementArray } from '../utility';
import { generateInputProps } from './utility';
import classes from './Auth.css';

class Auth extends Component{
  state = {
    login: constructAuthState()
  }

  handlers = {
    change: (event, id) => {
      const {value} = event.target;
      const type = Object.keys({...this.state})[0];
      const update = updateState(this.state, id, {value: formatInput(value, id)}, type);
      update[type][id].validation = checkValidity({...update[type][id]});
      this.setState({...update, showErrors: false});
    },
  
    submit: (event) => {
      event.preventDefault();
      const user = forSubmit({...this.state.login});
      this.props.authUser(Object.assign({...user}, {returnSecureToken: true}));
    }
  }
  

  render(){
    const {isUser} = this.props;
    const { submit, change } = this.handlers;
    const { login } = this.state;
    if(isUser)
      return <Redirect to={routes.SESSIONS} />;
    else
      return (
        <Section overlay={false}>
          <div className={classes.Login}>
            <form onSubmit={submit}>
            {generateFormElementArray(login)
                .map(element =>{
                  return <Input {...generateInputProps(element, login, change)} />
                }
              )}
              <button>login</button>
            </form>
          </div>
        </Section>
      );
    
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    user: state.auth.session_user,
    isUser: state.auth.token !== null,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authUser: (user, regularUser) => dispatch(actions.authUser(user, regularUser))
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));