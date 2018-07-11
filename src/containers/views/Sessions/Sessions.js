import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderTableContent, renderError} from './renders/';
import classes from './Sessions.css';
import Table from '../../../components/FormElements/Table/Table';
import {sessionTableHeaders} from '../../../store/app-data/table-headers';
import {constructPeriodState} from '../../../store/constructors/periods';
import {formatURL, formatDateURL} from '../../../gen-utility';
import * as actions from '../../../store/actions/sessions';
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
    const sessionCount = this.props.sessions.length;
    this.props.deleteSession(session, sessionCount)
  }

  periodHandler = (event, id) => {
    const value = getSelectedOptions(event);
    this.props.setPeriod(value);
  }


  render(){
    return (
      <section className={classes.Sessions}>
        {renderError(this.props.errors)}
        {/* {renderFormPeriod({...this.state}, this.periodHandler, this.props)} */}
        <Table labels={sessionTableHeaders}>
          {renderTableContent(this.props.sessions, this.handleDelete, this.handleEdit)}
        </Table>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    periods: state.sess.periods,
    errors: state.sess.error,
    currentPeriod: state.sess.currentPeriod
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: (id, sessionCount) => dispatch(actions.deleteSession(id, sessionCount)),
    fetchSession: (id) => dispatch(actions.fetchSession(id)),
    deActivateSelectedSession: () => dispatch(actions.deActivateSelectedSession()),
    filterSessions: (period) => dispatch(actions.filterSessions(period)),
    setPeriod: (period) => dispatch(actions.setPeriod(period))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));