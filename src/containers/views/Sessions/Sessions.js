import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructPeriodState} from '../../../store/constructors/periods';
import {formatURL, formatDateURLPretty} from '../../../gen-utility';
import * as actions from '../../../store/actions/sessions/sessions';
import {handlePeriodSelect} from '../../../store/actions/periods/periods';
import {getSelectedOptions} from '../../forms/form-utility';
import { filterByUser, WeeklyOrMonthly } from './__renders/utility';
import Weekly from './components/Weekly/Weekly';
import Monthly from './components/Monthly/Monthly';
import SessionsTable from './components/SessionsTable/SessionsTable';

class Sessions extends Component{
  state = {
    period: constructPeriodState(),
    isConfirming: false
  }

  componentDidMount(){
    this.props.deActivateSelectedSession();
  }

  handlers = {
    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
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
    }
  }

  render(){
    const {sessionsByPeriod, sessionsByWeek, isAuthenticated, user, weeks, weekFilteredBy, venues} = this.props;
    const sessionsAfterFilters = WeeklyOrMonthly(sessionsByPeriod, sessionsByWeek);
    const sessions = filterByUser(sessionsAfterFilters, isAuthenticated, user);
    const { handlers } = this;
    const { isConfirming } = this.state;
    
    return (
      <section>
        <Monthly props={this.props} period={this.state} periodHandler={handlers.periodHandler} sessions={sessions} /> 
        <Weekly weeks={weeks} sessions={sessionsByPeriod} weekFilteredBy={weekFilteredBy}/>
        <SessionsTable sessions={sessions} handlers={handlers} venues={venues} isConfirming={isConfirming} />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
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
    weekFilteredBy: state.per.weekFilteredBy
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: (sessions, session, token) => dispatch(actions.deleteSession(sessions, session, token)),
    fetchSession: (id) => dispatch(actions.fetchSession(id)),
    deActivateSelectedSession: () => dispatch(actions.deActivateSelectedSession()),
    handlePeriodSelect: (sessions, period) => dispatch(handlePeriodSelect(sessions, period))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));