import React, {Component} from 'react';
import classes from './Header.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as navElements from './renders/';
import {refreshLog} from '../../store/actions/general';
import {logout} from '../../store/actions/auth/auth';

class Header extends Component{
  componentWillReceiveProps(next){
    const {updatedLog, refreshLog, error} = this.props;
    if(next.updatedLog !== updatedLog || next.error !== error){
      setTimeout(() => {  
        refreshLog();
      }, 4000);
    }
  }

  logoutHandler = () => {
    const {history, logout} = this.props;
    logout();
    history.push('/');
  }

  render(){
    const {updatedLog, mapOfLog, error, user, isAuthenticated} = this.props;
    return(
      <div className={classes.Header}>
        <ul>
          {navElements.renderSessionViewLink()}
          {isAuthenticated && navElements.renderExaminerViewLink()}
          {!isAuthenticated && navElements.renderSingleExaminerViewLink(user)}
          {isAuthenticated && navElements.renderExaminerFormLink(this.props)}
          {isAuthenticated && navElements.renderSessionFormLink(this.props)}
          {navElements.renderLogout(this.logoutHandler, user)}
        </ul>
        {updatedLog && navElements.renderUpdateLog(updatedLog, mapOfLog)}
        {error && navElements.renderErrorLog(error, mapOfLog)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    selectedExaminer: state.ex.selectedExaminer,
    selectedSession: state.sess.selectedSession,
    user: state.auth.session_user,
    updatedLog: state.gen.updated,
    mapOfLog: state.gen.map,
    error: state.gen.error,
    isAuthenticated: state.auth.token !== null && state.auth.token !== '9999'
  }
}

const mapDispatchToProps = dispatch => {
  return{
    refreshLog: () => dispatch(refreshLog()),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));