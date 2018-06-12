import React, {Component} from 'react';
import classes from './Header.css';
import Logo from '../../components/Misc/Logo/Logo';
import IsAuthenticated from '../../components/Misc/Guards/IsAuthenticated';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderExaminerViewLink, renderExaminerFormLink, renderLogout} from './renders/';

class Header extends Component{
  render(){
    return(
      <div className={classes.Header}>
        <ul>
          <IsAuthenticated user={this.props.user}>
            {renderExaminerViewLink()}
            {renderExaminerFormLink(this.props)}
            {renderLogout(this.props.user)}
          </IsAuthenticated>
        </ul>
        <Logo />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    selectedExaminer: state.ex.selectedExaminer,
    user: state.auth.session_user
  }
}

export default withRouter(connect(mapStateToProps)(Header));