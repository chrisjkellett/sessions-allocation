import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ExaminerState from '../../store/constructors/examiners';


class Examiners extends Component{
  state = {
    examiners: ExaminerState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false
  }

  initialiseValidation = () => this.setState((prev) => ({ ...prev.state, shouldValidate: true }))

  render(){  
    return (
      <section>
        Examiners
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));