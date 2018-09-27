import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import ExaminerState from '../../store/constructors/examiners';
import ExaminersTable from './components/ExaminersTable/ExaminersTable';
import ExaminersForm from './components/ExaminersForm/ExaminersForm';
import { AddNewBtn } from '../../components/Btns/';
import * as actions from '../../store/actions/examiners/examiners';

class Examiners extends Component{
  state = {
    examiner: ExaminerState(),
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

    openForm: () => {
      this.setState({ showForm: true });
    },

    closeForm: () => {
      this.setState({ showForm: false });
    },

    cancel: () => {
      this.handlers.closeForm();
      this.setState({ examiner: ExaminerState() })
    },

    filter: (event) => {
      this.props.filterByName(event.target.value);
    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

  }

  render(){  
    const { isConfirming, showForm, examiner, shouldValidate } = this.state;
    const { examiners, filtered } = this.props;
    return (
      <section>
        <AsyncLoad waitFor={examiners}>
          <AddNewBtn showForm={showForm} openForm={this.handlers.openForm} label={'examiner'} />
          <ExaminersTable data={examiners} filtered={filtered} handlers={this.handlers} isConfirming={isConfirming}/>
          {showForm && 
            <ExaminersForm 
              handlers={this.handlers} 
              values={examiner} 
              shouldValidate={shouldValidate} 
              selectedExaminer={null} 
              clearSelectedExaminer={null} />
          }
        </AsyncLoad>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    filtered: state.ex.filteredExaminers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterByName: (string) => dispatch(actions.filterExaminerByName(string))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));