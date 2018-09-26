import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { constructPeriodState } from '../../store/constructors/periods';
import constructSessionState from '../../store/constructors/sessions';
import {formatURL, formatDateURLPretty} from '../../gen-utility';
import * as sessionActions from '../../store/actions/sessions/sessions';
import {handlePeriodSelect} from '../../store/actions/periods/periods';
import * as examinerOptionActions from '../../store/actions/examiner-options/examiner-options';
import {getSelectedOptions} from '../forms/form-utility';
import { filterByUser, WeeklyOrMonthly } from './__renders/utility';
import { checkValidity } from '../forms/validation/validation';
import { updateState, getInputValue, forSubmit, checkFormValidity } from '../utility';
import AddNewBtn from '../../components/Btns/AddNewBtn/AddNewBtn';
import Weekly from './components/Weekly/Weekly';
import Monthly from './components/Monthly/Monthly';
import SessionsTable from './components/SessionsTable/SessionsTable';
import SessionsForm from './components/SessionsForm/SessionsForm';
import AsyncLoad from '../app/components/AsyncLoad/AsyncLoad';

class Sessions extends Component{
  state = {
    session: constructSessionState(),
    period: constructPeriodState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false
  }

  initialiseValidation = () => this.setState((prev) => ({ ...prev.state, shouldValidate: true }))

  handlers = {
    submit: (event, props) => {
      const { session } = this.state;
      const { selectedSession, token, sessions } = this.props;
      event.preventDefault();
      this.initialiseValidation();
      const sessionForDB = forSubmit(session);
      
      if(checkFormValidity(session)){
        if(selectedSession === null)
        this.props.addSession(sessions, sessionForDB, token)
        // else
          // this.props.updateSession(sessionForDB, selectedSession.id, token);
        this.handlers.closeForm();
        this.setState({ venue: constructSessionState(), shouldValidate: false })
      }  
    },
    
    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

    openForm: () => {
      this.setState({ showForm: true });
    },

    closeForm: () => {
      this.setState({ showForm: false });
    },

    cancel: () => {
      this.handlers.closeForm();
      this.setState({ session: constructSessionState() })
    },

    change: (event, type, id, index) => {
      const {calculateAvailableExaminers, examiners, sessions} = this.props;
      const copyArray = [...this.state.session[id].value];
      const value = getInputValue(event, type, index, copyArray);
      const formType = Object.keys({...this.state})[0];
      const update = updateState(this.state, id, {value: value, id}, formType);
      update[formType][id].validation = checkValidity({...update[formType][id]});
      calculateAvailableExaminers(examiners, update.session, sessions);
      this.setState(update);
    },

    handleEdit: (session) => {
      const url = '/sessions/edit/' + formatURL(session.venue) + '-' + formatDateURLPretty([...session.session_date])
      this.props.fetchSession(session);
      this.props.history.push(url);
    },

    handleDelete: (session) => {
      const {sessions, deleteSession, token} = this.props;
      const updated = [...sessions.filter(s => s.id !== session.id)];
      deleteSession(updated, session, token);
    },

    periodHandler: (event) => {
      const {sessions} = this.props;
      const value = getSelectedOptions(event);
      this.props.handlePeriodSelect(sessions, value);
    },

    handleLink: (session) => {
      this.props.fetchSession(session);
      this.props.history.push('/sessions/' + formatURL(session.venue) + '-' + formatDateURLPretty([...session.session_date]));
    },

    ex_filter: ({target: {value}}) => {
      const {filterExaminers, examiners} = this.props;
      filterExaminers(examiners, value)
    },

    supp_filter: ({target: {value}}) => {
      const {filterSupport, examiners} = this.props;
      filterSupport(examiners, value)
    },

    resetExaminers: () => {
      this.setState(prev => ({
        session: { 
          ...prev.session, 
          examiners: {...prev.session.examiners, value: [] },
          support: {...prev.session.support, value: [] }
        }
      }));
    },
  }

  render(){
    const {sessionsByPeriod, sessionsByWeek, isAuthenticated, user, weeks, weekFilteredBy, venues} = this.props;
    const { availableExaminers, availableSupport, examiners } = this.props;
    const sessionsAfterFilters = WeeklyOrMonthly(sessionsByPeriod, sessionsByWeek);
    const sessions = filterByUser(sessionsAfterFilters, isAuthenticated, user);
    const { handlers } = this;
    const { isConfirming, showForm } = this.state;
    
  
    return (
      <AsyncLoad waitFor={examiners}>
        <section>
          <Monthly props={this.props} period={this.state.period} periodHandler={handlers.periodHandler} sessions={sessions} /> 
          <Weekly weeks={weeks} sessions={sessionsByPeriod} weekFilteredBy={weekFilteredBy}/>
          <SessionsTable sessions={sessions} handlers={handlers} venues={venues} isConfirming={isConfirming} />
          {showForm && (
            <SessionsForm 
              handlers={handlers} 
              state={this.state}
              sessions={sessions}
              examiners={examiners}
              availableExaminers={availableExaminers}
              availableSupport={availableSupport}
              venues={venues} />
          )}
          <AddNewBtn showForm={showForm} openForm={handlers.openForm} label={'Add new session'}/>
        </section>
      </AsyncLoad>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    examiners: state.ex.examiners,
    venues: state.venue.venues,
    errors: state.sess.error,
    periods: state.per.periods,
    currentPeriod: state.per.current,
    sessionsByPeriod: state.per.sessionsByPeriod,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null && state.auth.token !== '9999',
    isUser: state.auth.token !== null,
    user: state.auth.session_user,
    weeks: state.per.weeks,
    sessionsByWeek: state.per.sessionsByWeek,
    weekFilteredBy: state.per.weekFilteredBy,
    availableExaminers: state.op.ex_options,
    availableSupport: state.op.supp_options,
    selectedSession: state.sess.selectedSession
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSession: (sessions, session, token) => dispatch(sessionActions.addSession(sessions, session, token)),
    deleteSession: (sessions, session, token) => dispatch(sessionActions.deleteSession(sessions, session, token)),
    fetchSession: (id) => dispatch(sessionActions.fetchSession(id)),
    deActivateSelectedSession: () => dispatch(sessionActions.deActivateSelectedSession()),
    handlePeriodSelect: (sessions, period) => dispatch(handlePeriodSelect(sessions, period)),
    filterExaminers: (examiners, filterValue) => dispatch(examinerOptionActions.filterExaminers(examiners, filterValue)),
    filterSupport: (support, filterValue) => dispatch(examinerOptionActions.filterSupport(support, filterValue)),
    calculateAvailableExaminers: (examiners, session, sessions) => dispatch(examinerOptionActions.calculateAvailableExaminers(examiners, session, sessions)),
    calculateSameDaySessions: (sessions, sessionDate) => dispatch(examinerOptionActions.calculateSameDaySessions(sessions, sessionDate)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));