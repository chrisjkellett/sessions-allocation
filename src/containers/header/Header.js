import React, {Component} from 'react';
import classes from './Header.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderExaminerViewLink, renderExaminerFormLink} from './renders/';

class Header extends Component{
  render(){
    return(
      <ul className={classes.Header}>
        {renderExaminerViewLink()}
        {renderExaminerFormLink(this.props)}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return{
    selectedExaminer: state.ex.selectedExaminer
  }
}

export default withRouter(connect(mapStateToProps)(Header));