import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import ExaminerState from '../../store/constructors/examiners';
import ExaminersTable from './components/ExaminersTable/ExaminersTable';
import ExaminersForm from './components/ExaminersForm/ExaminersForm';
import { AddNewBtn } from '../../components/Btns/';
import { Section } from '../../components/Wrappers';
import { getInputValue, updateState, forSubmit } from '../utility';
import { checkValidity } from '../../validation/validation';
import * as actions from '../../store/actions/examiners/examiners';

class Examiners extends Component{
  state = {
    examiner: ExaminerState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false,
    extraLarge: false
  }

  handlers = {
    edit: () => {

    },

    delete: () => {

    },

    expand: () => {
      this.setState((prev) => ({ extraLarge: prev.extraLarge ? false : true }))
    },

    submit: (event) => {
      const { examiner } = this.state;
      event.preventDefault();
      this.handlers.validate();
      const examinerForDB = forSubmit(examiner);
      console.log(examinerForDB);
    },

    change: (event, type, id, index) => {
      const { examiner, shouldValidate } = this.state;
      const value = getInputValue(event, type, index, [ ...examiner[id].value ]);
      const update = updateState(this.state, id, { value: value, id }, 'examiner');
      if(shouldValidate){
        update.examiner[id].validation = checkValidity({ ...update.examiner[id] });
      }
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

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    }

  }

  render(){  
    const { isConfirming, showForm, examiner, shouldValidate, extraLarge } = this.state;
    const { examiners, filtered } = this.props;
    return (
      <Section showForm={showForm}>
        <AsyncLoad waitFor={examiners}>
          <AddNewBtn showForm={showForm} openForm={this.handlers.openForm} label={'examiner'} />
          <ExaminersTable data={examiners} filtered={filtered} handlers={this.handlers} isConfirming={isConfirming}/>
          {showForm && 
            <ExaminersForm 
              handlers={this.handlers} 
              values={examiner} 
              shouldValidate={shouldValidate} 
              selectedExaminer={null} 
              extraLarge={extraLarge}
              clearSelectedExaminer={null} />
          }
        </AsyncLoad>
      </Section>
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