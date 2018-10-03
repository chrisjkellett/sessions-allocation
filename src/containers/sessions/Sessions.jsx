import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInputValue, updateState, updateArray } from '../utility';
import { checkValidity } from '../../validation/validation';
import { Section } from '../../components/Wrappers';
import { AddNewBtn } from '../../components/Btns/';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import SessionsTable from './components/SessionsTable/SessionsTable';
import SessionsForm from './components/SessionsForm/SessionsForm';
import constructSessionState from '../../store/constructors/sessions';
import * as actions from '../../store/actions/sessions/sessions';
import * as exOpActions from '../../store/actions/examiner-options/examiner-options';


class Sessions extends Component{
  state = {
    session: constructSessionState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false
  }

  handlers = {
    addAsyncForm: (value, type) => {
      this.setState((prev) => ({
        session: { ...prev.session, [type]: { ...prev.session[type], value: value }}
      }))
    },

    edit: (id) => {

    },

    prepareForEdit: (selected) => {

    },

    delete: (examiner) => {

    },

    expand: () => {
      this.setState((prev) => ({ extraLarge: prev.extraLarge ? false : true }))
    },

    submit: (event) => {

    },

    change: (event, type, id, index) => {
      const { session } = this.state;
      const { examiners, sessions } = this.props;
      const value = getInputValue(event, type, index, [ ...session[id].value ]);
      const update = updateState(this.state, id, { value: value, id }, 'session');
      update.session[id].validation = checkValidity({ ...update.session[id] });
      this.props.calculateAvailableExaminers(examiners, update.session, sessions);
      this.setState(update);
    },

    selectExaminer: (name) => {
      this.setState((prev) => ({
        session: { 
          ...prev.session, 
          examiners: {...prev.session.examiners, 
          value: updateArray(prev.session.examiners.value, name)}}
      }))
    },

    selectSupport: (name) => {
      this.setState((prev) => ({
        session: { 
          ...prev.session, 
          support: {...prev.session.support, 
          value: updateArray(prev.session.support.value, name)}}
      }))
    },

    openForm: () => {
      this.setState({ showForm: true });
    },

    closeForm: () => {
      this.setState({ showForm: false });
    },

    cancel: () => {
      this.handlers.closeForm();
      this.setState({ session: constructSessionState(), shouldValidate: false })
    },

    filter: ({ target: { value, id }}) => {
      this.props.filterSessions(value, id);
    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    }
  }

  render(){  
    const { showForm, isConfirming, session, shouldValidate } = this.state;
    const { sessions, filteredSessions, venues } = this.props;

    return (
      <Section showForm={showForm}>
        <AsyncLoad waitFor={sessions}>
          <AddNewBtn showForm={showForm} openForm={this.handlers.openForm} label={'session'} />
          <SessionsTable 
            data={sessions} 
            filtered={filteredSessions} 
            handlers={this.handlers} 
            isConfirming={isConfirming} 
            venues={venues} />
          {showForm && 
            <SessionsForm 
              handlers={this.handlers} 
              values={session} 
              shouldValidate={shouldValidate}  />
          }
        </AsyncLoad>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    examiners: state.ex.examiners,
    venues: state.venue.venues,
    filteredSessions: state.sess.filteredSessions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterSessions: (value, filterBy) => dispatch(actions.filterSessionsByHeader(value, filterBy)),
    calculateAvailableExaminers: (examiners, session, sessions) => dispatch(exOpActions.calculateAvailableExaminers(examiners, session, sessions))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));