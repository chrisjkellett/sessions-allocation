import React, {Component} from 'react';
import {connect} from 'react-redux';

class Examiners extends Component{
  render(){
    return (
      <p>Examiners</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.examiners
  }
}

export default connect(mapStateToProps)(Examiners);