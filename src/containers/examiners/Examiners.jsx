import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import ExaminerState from '../../store/constructors/examiners';
import ExaminersTable from './components/ExaminersTable/ExaminersTable';
import ExaminersForm from './components/ExaminersForm/ExaminersForm';
import { AddNewBtn } from '../../components/Btns/';
import { getInputValue, updateState } from '../utility';
import { checkValidity } from '../../validation/validation';
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

    change: (event, type, id, index) => {
      const value = getInputValue(event, type, index, [...this.state.examiner[id].value]);
      const formType = Object.keys({...this.state})[0];
      const update = updateState(this.state, id, {value: value, id}, formType);
      update[formType][id].validation = checkValidity({...update[formType][id]});
      this.setState(update);
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

    filter: ({ target: { value, id }}) => {
      this.props.filterExaminer(value, id);
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
    filterExaminer: (value, filterBy) => dispatch(actions.filterExaminer(value, filterBy))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));