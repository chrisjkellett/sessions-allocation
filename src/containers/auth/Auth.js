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
import { generateInputProps, formatError } from './utility';
import classes from './Auth.css';

class Auth extends Component{
  state = {
    login: constructAuthState()
  }

  componentDidUpdate(){
    const { error } = this.props;
    if(error){
      document.getElementById('$email').focus();
    }
  }

  handlers = {
    change: (event, id) => {
      const {value} = event.target;
      const type = Object.keys({...this.state})[0];
      const update = updateState(this.state, id, {value: formatInput(value, id)}, type);
      update[type][id].validation = checkValidity({...update[type][id]});
      this.setState(update);
      this.props.clearErrors();
    },
  
    submit: (event) => {
      event.preventDefault();
      const user = forSubmit({...this.state.login});
      this.props.authUser(Object.assign({...user}, {returnSecureToken: true}));
    }
  }
  

  render(){
    const { isUser, error } = this.props;
    const { submit, change } = this.handlers;
    const { login } = this.state;
    if(isUser)
      return <Redirect to={routes.SESSIONS} />;
    else
      return (
        <Section overlay={false}>
        <div className={classes.ErrorWrapper}>
              {error && 
                  <div className={classes.Error}>
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>{formatError(error)}</span>
                  </div>
              }
            </div>
          <div className={classes.Login}>
            <div className={classes.Wrapper}>
              <form onSubmit={submit}>
              {generateFormElementArray(login)
                  .map(element =>{
                    return <Input {...generateInputProps(element, login, change)} />
                  }
                )}
                <button>login</button>
              </form>
            </div>
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
    authUser: (user) => dispatch(actions.authUser(user)),
    clearErrors: () => dispatch(actions.clearErrors()),
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));