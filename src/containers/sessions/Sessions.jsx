import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInputValue } from '../utility';
import { checkValidity } from '../../validation/validation';
import { Section } from '../../components/Wrappers';
import { Btn, BtnPanelFixed } from '../../components';
import { SessionsTable, SessionsForm } from './components';
import SingleSession from './components/SessionsTable/components/SingleSession/SingleSession';
import constructSessionState from '../../store/constructors/sessions';
import * as actions from '../../store/actions/sessions/sessions';
import * as exOpActions from '../../store/actions/examiner-options/examiner-options';
import * as perActions from '../../store/actions/periods/periods';
import { forSubmit, checkFormValidity, distributeValuesForEditing, updateArray } from '../utility';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    showDateFilter: false,
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handlers.escapeAll, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handlers.escapeAll, false);
    this.props.clearFilters();
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
      this.props.distributeExaminers(selected.examiners, selected.support)
    },

    delete: (session) => {
      const { token, sessions, showArchived } = this.props;
      this.props.deleteSession(sessions, session, token);
      showArchived && this.handlers.toggleArchive();
    },

    expand: () => {
      this.setState((prev) => ({ extraLarge: prev.extraLarge ? false : true }))
    },

    submit: (event) => {
      const { session } = this.state;
      const { token, sessions, selectedSession, showArchived } = this.props;
      event.preventDefault();
      this.handlers.validate();
      const sessionForDB = forSubmit(session);
      
      if(checkFormValidity(session)){
        if(selectedSession === null){
          this.props.addSession(sessions, sessionForDB, token)
          this.handlers.cancel();
        }else{
          this.props.updateSession(sessions, sessionForDB, selectedSession.id, token)
          this.handlers.cancel();
          showArchived && this.handlers.toggleArchive();
        }
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

    simulateChange: (id, examiner) => {
      const { session } = this.state;
      const { examiners, sessions, selectedSession } = this.props;
      const sessionId = selectedSession ? selectedSession.id : null;
      const value = updateArray(session[id].value, examiner);
      const updated = {...session, [id] : { ...session[id], value: value}}
      updated[id].validation = checkValidity({ ...updated[id] });
      this.props.calculateAvailableExaminers(examiners, updated, sessions, sessionId);
      this.setState({ session: updated });
    },

    selectExaminer: (name) => {
      const examiner = { name: name, supervisor: false }
      this.handlers.simulateChange('examiners', examiner)
      this.props.selectAvailableExaminers(examiner);
    },

    selectSupport: (name) => {
      const examiner = { name: name, supervisor: false }
      this.handlers.simulateChange('support', examiner)
      this.props.selectAvailableSupport(examiner);
    },

    changePairings: (examiners) => {
      this.setState((prev) => ({
        session: { ...prev.session, examiners: { ...prev.session.examiners, value: examiners }}
      }))
    },

    assignSupervisors: (examiners) => {
      this.setState((prev) => ({
        session: { ...prev.session, examiners: { ...prev.session.examiners, value: examiners }}
      }))
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

    toggleDateFilter: () => {
      this.setState((prev) => ({ showDateFilter: prev.showDateFilter ? false : true }))
    },

    escapeAll: (e) => {
      const { showArchived } = this.props;
      if(e.keyCode === 27) {
        this.state.showSingleView && this.handlers.closeSingleView();
        this.state.showForm && this.handlers.cancel();
        this.props.filteredSessions !== null && this.handlers.removeFilters();
      }
      if(e.keyCode === 78 && e.shiftKey) {
        e.preventDefault();
        !this.state.showForm ? this.handlers.add() : this.handlers.cancel();;
      }
      if(e.keyCode === 70 && e.ctrlKey) {
        e.preventDefault();
        this.handlers.toggleDateFilter();
      }

      if(e.keyCode === 81 && e.shiftKey) {
        e.preventDefault();
        this.handlers.toggleArchive();
      }

      if(e.keyCode === 27 && showArchived) {
        e.preventDefault();
        this.handlers.toggleArchive();
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
    },

    print: () => {
      html2canvas(document.querySelector("#session-table"), {scale: 2, width: 400, height: 400}).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', [297, 210]);
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf"); 
      });
    },

    toggleArchive: () => {
      const { showArchived, updatePeriods, toggleArchive, sessions, archived } = this.props;
      updatePeriods(showArchived ? sessions : archived);
      toggleArchive();
    }
  }

  render(){  
    const { 
      showForm, isConfirming, session, shouldValidate, showSingleView, activeFilter, showDateFilter 
    } = this.state;
    const { sessionsByPeriod, sessionsByWeek, filteredSessions, venues, selectedSession, examiners, sessions, showArchived } = this.props;
    const { clearSelectedSession } = this.props;
    const sessionsWithFilters = sessionsByWeek.length !== 0 ? sessionsByWeek : sessionsByPeriod;
    const filtered = filteredSessions ? filteredSessions.filter(s => sessionsWithFilters.some(x => s.id === x.id)) : null;

    return (
      <Section overlay={showForm || showSingleView}>
        <BtnPanelFixed hidden={showForm || showArchived}>
          <Btn handler={this.handlers.add} label={'add new session'} />
          <Btn handler={this.handlers.print} label={'download as pdf'} disabled />
        </BtnPanelFixed>
        <BtnPanelFixed hidden={!showArchived}>
          <Btn handler={this.handlers.toggleArchive} label={'return to sessions'} />
        </BtnPanelFixed>
        <div id='session-table'>
          <SessionsTable 
            data={showDateFilter ? sessions : sessionsWithFilters} 
            filtered={showDateFilter ? filteredSessions : filtered} 
            handlers={this.handlers} 
            isConfirming={isConfirming} 
            activeFilter={activeFilter}
            showDateFilter={showDateFilter}
            venues={venues} />
          </div>
        {showForm && 
          <SessionsForm 
            handlers={this.handlers} 
            session={session} 
            shouldValidate={shouldValidate}
            selectedSession={selectedSession} 
            clearSelectedSession={clearSelectedSession}  />
        }
        {showSingleView &&
          <SingleSession 
          session={selectedSession} 
          venues={venues} 
          examiners={examiners} 
          close={this.handlers.closeSingleView} />
        }
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    sessions: state.sess.sessions,
    archived: state.sess.archived,
    showArchived: state.sess.showArchived,
    sessionsByPeriod: state.per.sessionsByPeriod,
    sessionsByWeek: state.per.sessionsByWeek,
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
    distributeExaminers: (examiners, support) => dispatch(exOpActions.distributeExaminersOnEdit(examiners, support)),
    toggleArchive: () => dispatch(actions.toggleArchive()),
    updatePeriods: (sessions) => dispatch(perActions.updatePeriods(sessions))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));