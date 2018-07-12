import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderTableContent, renderError, renderFormPeriod} from './renders/';
import classes from './Sessions.css';
import Table from '../../../components/FormElements/Table/Table';
import {sessionTableHeaders} from '../../../store/app-data/table-headers';
import {constructPeriodState} from '../../../store/constructors/periods';
import {formatURL, formatDateURL} from '../../../gen-utility';
import * as actions from '../../../store/actions/sessions';
import {handlePeriodSelect} from '../../../store/actions/periods';
import {getSelectedOptions} from '../../forms/form-utility';

class Sessions extends Component{
  state = {
    period: constructPeriodState()
  }

  componentDidMount(){
    this.props.deActivateSelectedSession();
  }

  handleEdit = (session) => {
    this.props.fetchSession(session);
    this.props.history.push('/sessions/edit/' + formatURL(session.venue) + formatDateURL([...session.session_date]));
  }

  handleDelete = (session) => {
    const {sessions} = this.props;
    const updated = [...sessions.filter(s => s.id !== session.id)];
    this.props.deleteSession(updated, session);
  }

  periodHandler = (event, id) => {
    const {sessions} = this.props;
    const value = getSelectedOptions(event);
    this.props.handlePeriodSelect(sessions, value);
  }


  render(){
    const {errors, sessionsByPeriod} = this.props;
    return (
      <section className={classes.Sessions}>
        {renderError(errors)}
        {renderFormPeriod(this.state, this.periodHandler, this.props)}
        <Table labels={sessionTableHeaders}>
          {renderTableContent(sessionsByPeriod, this.handleDelete, this.handleEdit)}
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
    sessionsByPeriod: state.per.sessionsByPeriod

  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: (sessions, session) => dispatch(actions.deleteSession(sessions, session)),
    fetchSession: (id) => dispatch(actions.fetchSession(id)),
    deActivateSelectedSession: () => dispatch(actions.deActivateSelectedSession()),
    handlePeriodSelect: (sessions, period) => dispatch(handlePeriodSelect(sessions, period))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));