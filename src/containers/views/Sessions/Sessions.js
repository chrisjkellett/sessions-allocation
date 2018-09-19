import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderTableContent, renderFormPeriod} from './renders/';
import classes from './Sessions.css';
import Table from '../../../components/FormElements/Table/Table';
import {sessionTableHeaders} from '../../../store/app-data/table-headers';
import {constructPeriodState} from '../../../store/constructors/periods';
import {formatURL, formatDateURLPretty} from '../../../gen-utility';
import * as actions from '../../../store/actions/sessions/sessions';
import {handlePeriodSelect} from '../../../store/actions/periods';
import {getSelectedOptions} from '../../forms/form-utility';
import {filterByUser} from './renders/utility';
import Weekly from './components/Weekly';

class Sessions extends Component{
  state = {
    period: constructPeriodState()
  }

  componentDidMount(){
    this.props.deActivateSelectedSession();
  }

  handleEdit = (session) => {
    const url = '/sessions/edit/' + formatURL(session.venue) + '-' + formatDateURLPretty([...session.session_date])
    this.props.fetchSession(session);
    this.props.history.push(url);
  }

  handleDelete = (session) => {
    const {sessions, deleteSession, token} = this.props;
    const updated = [...sessions.filter(s => s.id !== session.id)];
    deleteSession(updated, session, token);
  }

  periodHandler = (event) => {
    const {sessions} = this.props;
    const value = getSelectedOptions(event);
    this.props.handlePeriodSelect(sessions, value);
  }

  handleLink = (session) => {
    this.props.fetchSession(session);
    this.props.history.push('/sessions/' + formatURL(session.venue) + '-' + formatDateURLPretty([...session.session_date]));
  }

  handlersObj = () => {
    return {
      linkHandler: this.handleLink
    }
  }


  render(){
    const {sessionsByPeriod, isAuthenticated, user, weeks} = this.props;
    const sessions = filterByUser(sessionsByPeriod, isAuthenticated, user);
    return (
      <section className={classes.Sessions}>
        {renderFormPeriod(this.state, this.periodHandler, this.props, sessions)}
        <Weekly weeks={weeks} />
        <Table labels={sessionTableHeaders}>
          {renderTableContent(sessions, this.handleDelete, this.handleEdit, this.handleLink, isAuthenticated, user)}
        </Table>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    errors: state.sess.error,
    periods: state.per.periods,
    currentPeriod: state.per.current,
    sessionsByPeriod: state.per.sessionsByPeriod,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null && state.auth.token !== '9999',
    isUser: state.auth.token !== null,
    user: state.auth.session_user,
    weeks: state.per.weeks
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