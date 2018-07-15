import React, {Component} from 'react';
import classes from './Header.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as navElements from './renders/';
import {refreshLog} from '../../store/actions/general';
import {logout} from '../../store/actions/auth';

class Header extends Component{
  componentWillReceiveProps(next){
    const {updatedLog, refreshLog} = this.props;
    if(next.updatedLog !== updatedLog){
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
    const {updatedLog, mapOfLog, exError, user} = this.props;
    return(
      <div className={classes.Header}>
        <ul>
          {navElements.renderExaminerViewLink()}
          {navElements.renderSessionViewLink()}
          {navElements.renderExaminerFormLink(this.props)}
          {navElements.renderSessionFormLink(this.props)}
          {navElements.renderLogout(this.logoutHandler)}
        </ul>
        {updatedLog && navElements.renderUpdateLog(updatedLog, mapOfLog)}
        {exError && navElements.renderErrorLog(exError)}
        {user && navElements.renderUserBar(user)}
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
    exError: state.ex.error
  }
}

const mapDispatchToProps = dispatch => {
  return{
    refreshLog: () => dispatch(refreshLog()),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));