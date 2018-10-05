import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInputValue, updateArray } from '../utility';
import { checkValidity } from '../../validation/validation';
import { Section } from '../../components/Wrappers';
import { AddNewBtn } from '../../components/Btns/';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import SessionsTable from './components/SessionsTable/SessionsTable';
import SessionsForm from './components/SessionsForm/SessionsForm';
import constructSessionState from '../../store/constructors/sessions';
import * as actions from '../../store/actions/sessions/sessions';
import * as exOpActions from '../../store/actions/examiner-options/examiner-options';
import { forSubmit, checkFormValidity, distributeValuesForEditing } from '../utility';


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
      this.props.fetchSession(id);
      this.handlers.openForm();
    },

    prepareForEdit: (selected) => {
      const { session } = this.state;
      this.setState({ session: distributeValuesForEditing(session, selected) })
    },

    delete: (session) => {
      const { token, sessions } = this.props;
      this.props.deleteSession(sessions, session, token);
    },

    expand: () => {
      this.setState((prev) => ({ extraLarge: prev.extraLarge ? false : true }))
    },

    submit: (event) => {
      const { session } = this.state;
      const { token, sessions, selectedSession } = this.props;
      event.preventDefault();
      this.handlers.validate();
      const sessionForDB = forSubmit(session);
      
      if(checkFormValidity(session)){
        if(selectedSession === null)
          this.props.addSession(sessions, sessionForDB, token)
        else
        this.props.updateSession(sessions, sessionForDB, selectedSession.id, token)
      this.handlers.closeForm();
      this.setState({ examiner: constructSessionState(), shouldValidate: false })
      }
    },

    change: (event, type, id, index) => {
      const { session } = this.state;
      const { examiners, sessions, selectedSession } = this.props;
      const sessionId = selectedSession ? selectedSession.id : null;
      const value = getInputValue(event, type, index, [ ...session[id].value ]);
      const updated = {...session, [id] : { ...session[id], value: value}}
      updated[id].validation = checkValidity({ ...updated[id] });
      this.props.calculateAvailableExaminers(examiners, updated, sessions, sessionId);
      this.setState({ session: updated });
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
    const { sessions, filteredSessions, venues, selectedSession } = this.props;
    const { clearSelectedSession } = this.props;

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
              session={session} 
              shouldValidate={shouldValidate}
              selectedSession={selectedSession} 
              clearSelectedSession={clearSelectedSession}  />
          }
        </AsyncLoad>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    sessions: state.sess.sessions,
    selectedSession: state.sess.selectedSession,
    examiners: state.ex.examiners,
    venues: state.venue.venues,
    filteredSessions: state.sess.filteredSessions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterSessions: (value, filterBy) => dispatch(actions.filterSessionsByHeader(value, filterBy)),
    calculateAvailableExaminers: (examiners, session, sessions, sessionId) => {
      dispatch(exOpActions.calculateAvailableExaminers(examiners, session, sessions, sessionId))
    },
    addSession: (sessions, session, token) => dispatch(actions.addSession(sessions, session, token)),
    deleteSession: (sessions, session, token) => dispatch(actions.deleteSession(sessions, session, token)),
    updateSession: (sessions, session, id, token) => dispatch(actions.updateSession(sessions, session, id, token)),
    fetchSession: (id) => dispatch(actions.fetchSession(id)),
    clearSelectedSession: () => dispatch(actions.clearSelectedSession()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));