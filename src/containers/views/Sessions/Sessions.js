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

class Sessions extends Component{
  state = {
    period: constructPeriodState()
  }

  componentDidMount(){
    this.props.deActivateSelectedSession();
  }

  handleEdit = (session) => {
    this.props.fetchSession(session);
    this.props.history.push('/sessions/edit/' + formatURL(session.venue) + '+' + formatDateURL([...session.session_date]));
  }

  handleDelete = (id) => {
    this.props.deleteSession(id)
  }

  periodHandler = () => {
    console.log('handled');
  }

  render(){
    return (
      <section className={classes.Sessions}>
        {renderError(this.props.errors)}
        {renderFormPeriod({...this.state}, this.periodHandler)}
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
    errors: state.sess.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: (id) => dispatch(actions.deleteSession(id)),
    fetchSession: (id) => dispatch(actions.fetchSession(id)),
    deActivateSelectedSession: () => dispatch(actions.deActivateSelectedSession())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));