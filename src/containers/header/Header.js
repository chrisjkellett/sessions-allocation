import React, {Component} from 'react';
import classes from './Header.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as navElements from './renders/';

class Header extends Component{
  render(){
    return(
      <div className={classes.Header}>
        <ul>
          {navElements.renderExaminerViewLink(this.props)}
          {navElements.renderSessionViewLink(this.props)}
          {navElements.renderExaminerFormLink(this.props)}
          {navElements.renderSessionFormLink(this.props)}
          {navElements.renderLogout(this.props)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    selectedExaminer: state.ex.selectedExaminer,
    selectedSession: state.sess.selectedSession,
    user: state.auth.session_user,
    updatedSession: state.sess.updated
  }
}

export default withRouter(connect(mapStateToProps)(Header));