import React, {Component} from 'react';
import classes from './Header.css';
import Logo from '../../components/Misc/Logo/Logo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderExaminerViewLink, renderExaminerFormLink} from './renders/';

class Header extends Component{
  render(){
    return(
      <div className={classes.Header}>
        <ul>
          {renderExaminerViewLink()}
          {renderExaminerFormLink(this.props)}
        </ul>
        <Logo />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    selectedExaminer: state.ex.selectedExaminer
  }
}

export default withRouter(connect(mapStateToProps)(Header));