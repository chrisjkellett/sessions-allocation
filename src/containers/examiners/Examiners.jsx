import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import ExaminerState from '../../store/constructors/examiners';
import ExaminersTable from './components/ExaminersTable/ExaminersTable';

class Examiners extends Component{
  state = {
    examiners: ExaminerState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false
  }

  initialiseValidation = () => this.setState((prev) => ({ ...prev.state, shouldValidate: true }))

  handlers = {
    edit: () => {

    },

    delete: () => {

    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

  }

  render(){  
    const { isConfirming } = this.state;
    const { examiners } = this.props;
    return (
      <section>
        <AsyncLoad waitFor={examiners}>
          <ExaminersTable data={examiners} handlers={this.handlers} isConfirming={isConfirming}/>
        </AsyncLoad>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));