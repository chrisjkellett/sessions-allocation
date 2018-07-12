import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {renderUL} from './renders/renders';

class SingleExaminer extends Component{
  render(){
    return (
      <div>Single session page</div>
    )
  }
}

const mapStateToProps = state => {
  return{
    examiner: state.ex.selectedExaminer
  }
}


export default connect(mapStateToProps)(SingleExaminer);