import React, {Component} from 'react';
import classes from './Header.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as navElements from './renders/';
import {refreshLog} from '../../store/actions/general';

class Header extends Component{
  componentWillReceiveProps(next){
    if(next.updatedLog !== this.props.updatedLog){
      setTimeout(() => {  
        this.props.refreshLog();
    }, 4000);
    }

  }

  render(){
    const {updatedLog, mapOfLog} = this.props;
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
    mapOfLog: state.gen.map
  }
}

const mapDispatchToProps = dispatch => {
  return{
    refreshLog: () => dispatch(refreshLog())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));