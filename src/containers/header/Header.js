import React, {Component} from 'react';
import classes from './Header.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as navElements from './renders/';
import {refreshLog} from '../../store/actions/general';

class Header extends Component{
  componentWillReceiveProps(next){
    const {updatedLog, refreshLog} = this.props;
    if(next.updatedLog !== updatedLog){
      setTimeout(() => {  
        refreshLog();
    }, 4000);
    }

  }

  render(){
    const {updatedLog, mapOfLog, exError} = this.props;
    return(
      <div className={classes.Header}>
        <ul>
          {navElements.renderExaminerViewLink()}
          {navElements.renderSessionViewLink()}
          {navElements.renderExaminerFormLink(this.props)}
          {navElements.renderSessionFormLink(this.props)}
          {navElements.renderLogout(this.props)}
        </ul>
        {updatedLog && navElements.renderUpdateLog(updatedLog, mapOfLog)}
        {exError && navElements.renderErrorLog(exError, mapOfLog)}
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
    refreshLog: () => dispatch(refreshLog())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));