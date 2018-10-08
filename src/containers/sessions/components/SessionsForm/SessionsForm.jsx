import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionsFormContent from './components/SessionsFormContent/SessionsFormContent';
import ExaminersAvailable from './components/ExaminersAvailable/ExaminersAvailable';
import SupportAvailable from './components/SupportAvailable/SupportAvailable';
import SameDaySessions from './components/SameDaySessions/SameDaySessions';
import * as exOpActions from '../../../../store/actions/examiner-options/examiner-options';
import { Form, FlexContainer, FlexItem, ShowHideBtn} from '../../../../components';
import moment from 'moment';

class SessionsForm extends Component {
  state = {
    showExaminers: false,
    showSupport: false,
    showSameDay: false,
    showUnavailable: false,
  }

  componentDidMount(){
    const { venues, selectedSession } = this.props;
    selectedSession && this.props.handlers.prepareForEdit(selectedSession);
    if(venues !== null && !selectedSession) this.props.handlers.addAsyncForm(venues[0].name, 'venue'); 

    const { examiners, session, sessions } = this.props;
    const sessionId = selectedSession ? selectedSession.id : null;
    this.props.calculateAvailableExaminers(examiners, session, sessions, sessionId);
  }

  componentWillUnmount(){
    this.props.clearSelectedSession();
  }

  handlers = {
    toggle: (type) => {
      this.setState((prev) => ({ [type] : prev[type] ? false : true }))
    }
  }

  hasTableOpen = () => {
    return Object.keys(this.state).some(item => this.state[item])
  }
  
  render() {
    const { handlers, session, shouldValidate, selectedSession } = this.props;
    const { availableExaminers, availableSupport, sessions } = this.props;
    const { showExaminers, showSupport, showSameDay, showUnavailable } = this.state;
    const examinersOrSupport = showExaminers || showSupport;
    const label = selectedSession !== null ? 'Save changes' : 'Add Session';
    const selectedId = selectedSession ? selectedSession.id : null;
    const labelForShowAll = showUnavailable ? '-hide unavailable' : '+show unavailable';
    const labelForSelectExaminers = showExaminers ? '-hide examiners' : '+select examiners';
    const labelForSelectSupport = showSupport ? '-hide support' : '+select support';
    const forSDSessions = sessions
    .filter(s => s.id !== selectedId && moment(s['session_date']).isSame(session['session_date'].value));

    return (
        <Form handlers={handlers} label={label} edit={selectedSession} extraLarge={this.hasTableOpen()}>
          <FlexContainer>
            <FlexItem>
              <SessionsFormContent 
                values={session} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={1} />    
            </FlexItem>
            <FlexItem double>
              <ShowHideBtn handler={this.handlers.toggle} type="showExaminers" label={labelForSelectExaminers} />
              <ShowHideBtn handler={this.handlers.toggle} type="showSupport" label={labelForSelectSupport} />
              {!showSameDay && forSDSessions.length > 0
                && <ShowHideBtn handler={this.handlers.toggle} type="showSameDay" label="show same day sessions"/>}
              {examinersOrSupport
                && <ShowHideBtn handler={this.handlers.toggle} type="showUnavailable" label={labelForShowAll} />}
              {showExaminers 
                && <ExaminersAvailable 
                  data={availableExaminers} 
                  handlers={handlers} 
                  session={session} 
                  showUnavailable={showUnavailable} />}
              {showSupport 
                && <SupportAvailable 
                    data={availableSupport} 
                    handlers={handlers} 
                    session={session} 
                    showUnavailable={showUnavailable} />}
              {showSameDay 
                && <SameDaySessions data={forSDSessions} />}
            </FlexItem>
          </FlexContainer>
        </Form>
    )
  }
};

const mapStateToProps = state => {
  return {
    venues: state.venue.venues,
    sessions: state.sess.sessions,
    examiners: state.ex.examiners,
    availableExaminers: state.op.ex_options,
    availableSupport: state.op.supp_options,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    calculateAvailableExaminers: (examiners, session, sessions, sessionId) => {
      dispatch(exOpActions.calculateAvailableExaminers(examiners, session, sessions, sessionId))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionsForm));

