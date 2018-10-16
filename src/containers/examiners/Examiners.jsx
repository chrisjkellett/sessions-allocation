import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { constructExaminerState } from '../../store/constructors/examiners';
import ExaminersTable from './components/ExaminersTable/ExaminersTable';
import ExaminersForm from './components/ExaminersForm/ExaminersForm';
import SingleExaminer from './components/ExaminersTable/SingleExaminer/SingleExaminer';
import { AddNewBtn } from '../../components/Btns/';
import { Section } from '../../components/Wrappers';
import { getInputValue, updateState, forSubmit, checkFormValidity, distributeValuesForEditing, sortLevels } from '../utility';
import { checkValidity } from '../../validation/validation';
import * as actions from '../../store/actions/examiners/examiners';

class Examiners extends Component {
  constructor(props){
    super(props);
    this.handlers.escapeAll = this.handlers.escapeAll.bind(this);
  }

  state = {
    examiner: constructExaminerState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false,
    extraLarge: false,
    activeFilter: false,
    showSingleView: false,
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handlers.escapeAll, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handlers.escapeAll, false);
  }

  handlers = {
    add: () => {
      this.props.fetchExaminer();
      this.handlers.openForm();
    },

    edit: (id) => {
      this.props.fetchExaminer(id);
      this.handlers.openForm();
    },

    prepareForEdit: (selected) => {
      const { examiner } = this.state;
      this.setState({ examiner: distributeValuesForEditing(examiner, selected) })
    },

    delete: (examiner) => {
      const { token } = this.props;
      this.props.deleteExaminer(examiner, token);
    },

    expand: () => {
      this.setState((prev) => ({ extraLarge: prev.extraLarge ? false : true }))
    },

    submit: (event) => {
      const { examiner } = this.state;
      const { token, selectedExaminer } = this.props;
      event.preventDefault();
      this.handlers.validate();
      const examinerForDB = forSubmit(examiner);
      
      if(checkFormValidity(examiner)){
        if(selectedExaminer === null)
          this.props.addExaminer(examinerForDB, token)
        else
          this.props.updateExaminer(examinerForDB, selectedExaminer.id, token)
        this.handlers.closeForm();
        this.setState({ examiner: constructExaminerState(), shouldValidate: false })
      }
    },

    change: (event, type, id, index) => {
      const { examiner } = this.state;
      const value = getInputValue(event, type, index, [ ...examiner[id].value ]);
      if(id === 'levels') sortLevels(value);
      const update = updateState(this.state, id, { value: value, id }, 'examiner');
      update.examiner[id].validation = checkValidity({ ...update.examiner[id] });
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
      this.setState({ examiner: constructExaminerState(), shouldValidate: false })
    },

    removeFilters: () => {
      this.setState({ activeFilter: false });
      this.props.clearFilters();
    },

    escapeAll: (e) => {
      if(e.keyCode === 27) {
        this.state.showSingleView && this.handlers.closeSingleView();
        this.state.showForm && this.handlers.cancel();
        this.props.filtered !== null && this.handlers.removeFilters();
      }
      else if(e.keyCode === 65 && e.ctrlKey) {
        e.preventDefault();
        !this.state.showForm && this.handlers.add();
      }
    },

    filter: ({ target: { value, id }}) => {
      this.setState({ activeFilter: value.trim() !== '' ? true : false })
      this.props.filterExaminer(value.trim(), id);
    },

    openSingleView: (id) => {
      this.props.fetchExaminer(id);
      this.setState({ showSingleView: true });
    },

    closeSingleView: () => {
      this.setState({ showSingleView: false });
      this.props.clearSelectedExaminer();
    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    }

  }

  render(){  
    const { isConfirming, showForm, examiner, shouldValidate, extraLarge, activeFilter, showSingleView } = this.state;
    const { examiners, filtered, selectedExaminer, sessions } = this.props;
    const { clearSelectedExaminer } = this.props;
    return (
      <Section overlay={showForm || showSingleView}>
        <AddNewBtn showForm={showForm} openForm={this.handlers.add} label={'examiner'} />
        <ExaminersTable 
          data={examiners} 
          filtered={filtered} 
          handlers={this.handlers} 
          isConfirming={isConfirming}
          activeFilter={activeFilter} />
        {showForm && 
          <ExaminersForm 
            handlers={this.handlers} 
            values={examiner} 
            shouldValidate={shouldValidate} 
            selectedExaminer={selectedExaminer} 
            extraLarge={extraLarge}
            clearSelectedExaminer={clearSelectedExaminer} />
        }
        {showSingleView &&
          <SingleExaminer examiner={selectedExaminer} sessions={sessions} />
        }
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    token: state.auth.token,
    examiners: state.ex.examiners,
    filtered: state.ex.filteredExaminers,
    selectedExaminer: state.ex.selectedExaminer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterExaminer: (value, filterBy) => dispatch(actions.filterExaminer(value, filterBy)),
    addExaminer: (examiner, token) => dispatch(actions.addExaminer(examiner, token)),
    deleteExaminer: (examiner, token) => dispatch(actions.deleteExaminer(examiner, token)),
    fetchExaminer: (id) => dispatch(actions.fetchExaminer(id)),
    clearSelectedExaminer: () => dispatch(actions.clearSelectedExaminer()),
    updateExaminer: (examiner, id, token) => dispatch(actions.updateExaminer(examiner, id, token)),
    clearFilters: () => dispatch(actions.clearFilters()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));