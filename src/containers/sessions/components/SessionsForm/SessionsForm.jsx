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
  }

  componentDidMount(){
    const { venues, selectedSession } = this.props;
    selectedSession && this.props.handlers.prepareForEdit(selectedSession);
    if(venues !== null && !selectedSession) this.props.handlers.addAsyncForm(venues[0].name, 'venue'); 

    const { examiners, values, sessions } = this.props;
    this.props.calculateAvailableExaminers(examiners, values, sessions);
  }

  componentWillUnmount(){
    this.props.clearSelectedSession();
  }

  handlers = {
    open: (type) => {
      this.setState((prev) => ({ [type] : true }))
    },

    close: (type) => {
      this.setState((prev) => ({ [type] : false }))
    }
  }

  hasTableOpen = () => {
    return Object.keys(this.state).some(item => this.state[item])
  }
  
  render() {
    const { handlers, values, shouldValidate, selectedSession } = this.props;
    const { availableExaminers, availableSupport, sessions } = this.props;
    const { showExaminers, showSupport, showSameDay } = this.state;
    const label = selectedSession !== null ? 'Save changes' : 'Add Session';
    const forSDSessions = sessions.filter(s => moment(s['session_date']).isSame(values['session_date'].value));

    return (
        <Form handlers={handlers} label={label} edit={selectedSession} extraLarge={this.hasTableOpen()}>
          <FlexContainer>
            <FlexItem>
              <SessionsFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={1} />    
            </FlexItem>
            <FlexItem double>
              {!showExaminers 
                && <ShowHideBtn handler={this.handlers.open} type="showExaminers" label="select examiners"/>}
              {!showSupport 
                && <ShowHideBtn handler={this.handlers.open} type="showSupport" label="select support"/>}
              {!showSameDay && forSDSessions.length > 0
                && <ShowHideBtn handler={this.handlers.open} type="showSameDay" label="show same day sessions"/>}
              {showExaminers 
                && <ExaminersAvailable data={availableExaminers} handlers={handlers} session={values} closeHandler={this.handlers.close} />}
              {showSupport 
                && <SupportAvailable data={availableSupport} handlers={handlers} session={values} closeHandler={this.handlers.close} />}
              {showSameDay 
                && <SameDaySessions data={forSDSessions} closeHandler={this.handlers.close} />}
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
    calculateAvailableExaminers: (examiners, session, sessions) => {
      dispatch(exOpActions.calculateAvailableExaminers(examiners, session, sessions))
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionsForm));

