import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import { constructAuthState } from '../../store/constructors/auth';
import { updateState, forSubmit } from '../utility';
import {formatInput} from '../../validation/utility';
import * as actions from '../../store/actions/auth/auth';
import * as routes from '../../store/app-data/routes';
import { Section } from '../../components';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Login from './components/Login/Login';
import { Logo } from '../../components';

class Auth extends Component {
  constructor(props){
    super(props);
    this.handlers.clear = this.handlers.clear.bind(this);
  }

  state = {
    login: constructAuthState()
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handlers.clear, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handlers.clear, false);
  }

  componentDidUpdate(){
    const { error } = this.props;
    if(error){
      document.getElementById('$email').focus();
    }
  }

  handlers = {
    change: (e, id) => {
      this.setState(updateState(this.state, id, {value: formatInput(e.target.value, id)}, 'login'));
      this.props.clearErrors();
    },
  
    submit: (event) => {
      event.preventDefault();
      const user = forSubmit({...this.state.login});
      this.props.authUser(Object.assign({...user}, {returnSecureToken: true}));
      this.setState((prev) => ({
        login: { 
          ...prev.login, 
          email: { ...prev.login.email, value: '' },
          password: { ...prev.login.password, value: '' },
        }
      }))
    },

    clear: (e) => {
      if(e.keyCode === 27) {
        this.props.clearErrors();
      }
    }
  }
  

  render(){
    const { isUser, error } = this.props;
    const { login } = this.state;
    if(isUser)
      return <Redirect to={routes.SESSIONS} />;
    else
      return (
        <Section overlay={false}>
          <Logo />
          <ErrorMessage error={error} />
          <Login login={login} handlers={this.handlers} />
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