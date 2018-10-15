import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInputValue } from '../utility';
import { checkValidity } from '../../validation/validation';
import { Section } from '../../components/Wrappers';
import { AddNewBtn } from '../../components/Btns/';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import SessionsTable from './components/SessionsTable/SessionsTable';
import SessionsForm from './components/SessionsForm/SessionsForm';
import SingleSession from './components/SessionsTable/components/SingleSession/SingleSession';
import constructSessionState from '../../store/constructors/sessions';
import * as actions from '../../store/actions/sessions/sessions';
import * as exOpActions from '../../store/actions/examiner-options/examiner-options';
import { forSubmit, checkFormValidity, distributeValuesForEditing, updateArray } from '../utility';


class Sessions extends Component {
  constructor(props){
    super(props);
    this.handlers.escapeAll = this.handlers.escapeAll.bind(this);
  }

  state = {
    session: constructSessionState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false,
    showSingleView: false,
    activeFilter: false,
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handlers.escapeAll, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handlers.escapeAll, false);
  }

  componentDidUpdate(){
    if(this.props.sessionExaminers.length !== this.state.session.examiners.value.length){
      this.setState((prev) => ({
        session: { ...prev.session, examiners: { ...prev.session.examiners, value: this.props.sessionExaminers }}
      }))
    }

    if(this.props.sessionSupport.length !== this.state.session.support.value.length){
      this.setState((prev) => ({
        session: { ...prev.session, support: { ...prev.session.support, value: this.props.sessionSupport }}
      }))
    }
  }

  handlers = {
    addAsyncForm: (value, type) => {
      this.setState((prev) => ({
        session: { ...prev.session, [type]: { ...prev.session[type], value: value }}
      }))
    },

    add: () => {
      this.props.fetchSession();
      this.handlers.openForm();
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
        if(selectedSession === undefined)
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

    simulateChange: (id, name) => {
      const { session } = this.state;
      const { examiners, sessions, selectedSession } = this.props;
      const sessionId = selectedSession ? selectedSession.id : null;
      const value = updateArray(session[id].value, name);
      const updated = {...session, [id] : { ...session[id], value: value}}
      updated[id].validation = checkValidity({ ...updated[id] });
      this.props.calculateAvailableExaminers(examiners, updated, sessions, sessionId);
      this.setState({ session: updated });
    },

    selectExaminer: (name) => {
      this.handlers.simulateChange('examiners', name)
      this.props.selectAvailableExaminers(name);
    },

    selectSupport: (name) => {
      this.handlers.simulateChange('support', name)
      this.props.selectAvailableSupport(name);
    },

    assignSupervisor: () => {
      console.log('supervise!');
    },

    openForm: () => {
      this.setState({ showForm: true });
    },

    closeForm: () => {
      this.setState({ showForm: false });
    },

    openSingleView: (id) => {
      this.props.fetchSession(id);
      this.setState({ showSingleView: true });
    },

    closeSingleView: () => {
      this.setState({ showSingleView: false });
      this.props.clearSelectedSession();
    },

    escapeAll: (e) => {
      if(e.keyCode === 27) {
        this.state.showSingleView && this.handlers.closeSingleView();
        this.state.showForm && this.handlers.cancel();
        this.props.filteredSessions !== null && this.handlers.removeFilters();
      }
      else if(e.keyCode === 65 && e.ctrlKey) {
        e.preventDefault();
        !this.state.showForm && this.handlers.add();
      }
    },

    cancel: () => {
      this.handlers.closeForm();
      this.setState({ session: constructSessionState(), shouldValidate: false });
      this.props.clearSelectedExaminers();
    },

    filter: ({ target: { value, id }}) => {
      this.setState({ activeFilter: value.trim() !== '' ? true : false })
      this.props.filterSessions(value.trim(), id);
    },

    removeFilters: () => {
      this.setState({ activeFilter: false });
      this.props.clearFilters();
    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    }
  }

  render(){  
    const { showForm, isConfirming, session, shouldValidate, showSingleView, activeFilter } = this.state;
    const { sessions, filteredSessions, venues, selectedSession, examiners } = this.props;
    const { clearSelectedSession } = this.props;

    return (
      <Section showForm={showForm}>
        <AsyncLoad waitFor={sessions}>
          <AddNewBtn showForm={showForm} openForm={this.handlers.add} label={'session'} />
          <SessionsTable 
            data={sessions} 
            filtered={filteredSessions} 
            handlers={this.handlers} 
            isConfirming={isConfirming} 
            activeFilter={activeFilter}
            venues={venues} />
          {showForm && 
            <SessionsForm 
              handlers={this.handlers} 
              session={session} 
              shouldValidate={shouldValidate}
              selectedSession={selectedSession} 
              clearSelectedSession={clearSelectedSession}  />
          }
          {showSingleView &&
            <SingleSession session={selectedSession} venues={venues} examiners={examiners}/>
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
    sessionExaminers: state.op.sessionExaminers,
    sessionSupport: state.op.sessionSupport,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterSessions: (value, filterBy) => dispatch(actions.filterSessionsByHeader(value, filterBy)),
    calculateAvailableExaminers: (examiners, session, sessions, sessionId) => {
      dispatch(exOpActions.calculateAvailableExaminers(examiners, session, sessions, sessionId))
    },
    selectAvailableExaminers: (examiner) => dispatch(exOpActions.selectAvailableExaminers(examiner)),
    selectAvailableSupport: (support) => dispatch(exOpActions.selectAvailableSupport(support)),
    addSession: (sessions, session, token) => dispatch(actions.addSession(sessions, session, token)),
    deleteSession: (sessions, session, token) => dispatch(actions.deleteSession(sessions, session, token)),
    updateSession: (sessions, session, id, token) => dispatch(actions.updateSession(sessions, session, id, token)),
    fetchSession: (id) => dispatch(actions.fetchSession(id)),
    clearSelectedSession: () => dispatch(actions.clearSelectedSession()),
    clearSelectedExaminers: () => dispatch(exOpActions.clearSelectedExaminers()),
    clearFilters: () => dispatch(actions.clearFilters()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));