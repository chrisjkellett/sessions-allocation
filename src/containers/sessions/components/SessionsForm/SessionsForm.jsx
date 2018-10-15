import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as exOpActions from '../../../../store/actions/examiner-options/examiner-options';
import { Form, FlexContainer, FlexItem, ShowHideBtn} from '../../../../components';
import { 
  SessionsFormContent, ExaminersAvailable, SupportAvailable, SameDaySessions } from './components';
import moment from 'moment';

const initialState = {
  showExaminers: false,
  showSupport: false,
  showSameDay: false,
  showUnavailable: false,
  showAssignSupervisors: false,
};

class SessionsForm extends Component {
  constructor(props){
    super(props);
    this.handlers.ctrlToggles = this.handlers.ctrlToggles.bind(this);
  }

  state = initialState;

  componentDidMount(){
    const { venues, selectedSession } = this.props;
    selectedSession && this.props.handlers.prepareForEdit(selectedSession);
    if(venues !== null && !selectedSession) this.props.handlers.addAsyncForm(venues[0].name, 'venue'); 

    const { examiners, session, sessions } = this.props;
    const sessionId = selectedSession ? selectedSession.id : null;
    this.props.calculateAvailableExaminers(examiners, session, sessions, sessionId);
    document.getElementById('$session_date').focus();
    document.addEventListener("keydown", this.handlers.ctrlToggles, false);
  }

  componentWillUnmount(){
    this.props.clearSelectedSession();
    document.removeEventListener("keydown", this.handlers.ctrlToggles, false);
  }

  handlers = {
    toggleExaminers: () => {
      this.setState((prev) => ({ 
        ...initialState, 
        showExaminers : prev.showExaminers ? false : true,
        showSupport : prev.showSupport ? true : false 
      }))
    },

    toggleSupport: () => {
      this.setState((prev) => ({ 
        ...initialState, 
        showSupport : prev.showSupport ? false : true,
        showExaminers : prev.showExaminers ? true : false 
      }))
    },

    toggleSameDay: () => {
      this.setState((prev) => ({ ...initialState, showSameDay : prev.showSameDay ? false : true }))
    },

    toggleUnavailable: () => {
      this.setState((prev) => ({ showUnavailable : prev.showUnavailable ? false : true }))
    },

    ctrlToggles: (e) => {
      if(e.keyCode === 69 && e.ctrlKey){
        e.preventDefault();
        this.handlers.toggleExaminers();
      }

      if(e.keyCode === 83 && e.ctrlKey){
        e.preventDefault();
        this.handlers.toggleSupport();
      }

      if(e.keyCode === 85 && e.ctrlKey){
        e.preventDefault();
        this.handlers.toggleUnavailable();
      }

      if(e.keyCode === 68 && e.ctrlKey){
        e.preventDefault();
        this.handlers.toggleSameDay();
      }

      if(e.keyCode === 90 && e.ctrlKey){
        e.preventDefault();
        this.setState(initialState);
      }
    }
  }
  
  render() {
    const { handlers, session, shouldValidate, selectedSession } = this.props;
    const { availableExaminers, availableSupport, sessions, selectedExaminers, selectedSupport } = this.props;
    const { showExaminers, showSupport, showSameDay, showUnavailable, showAssignSupervisors } = this.state;
    const examinersOrSupport = showExaminers || showSupport;
    const label = selectedSession !== null ? 'Save changes' : 'Add Session';
    const selectedId = selectedSession ? selectedSession.id : null;
    const labelForShowAll = showUnavailable ? '-hide unavailable' : '+show unavailable';
    const labelForSelectExaminers = showExaminers ? '-hide examiners' : '+select examiners';
    const labelForSameDay = showSameDay ? '-hide same day sessions' : '+show same day sessions';
    const labelForSelectSupport = showSupport ? '-hide support' : '+select support';
    const labelForAssignSupervisors = showAssignSupervisors ? '-hide supervisors' : '+assign supervisors';
    const forSDSessions = sessions
    .filter(s => s.id !== selectedId && moment(s['session_date']).isSame(session['session_date'].value));

    return (
        <Form handlers={handlers} label={label} edit={selectedSession} extraLarge>
          <FlexContainer>
            <FlexItem>
              <SessionsFormContent 
                values={session} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={1} />    
            </FlexItem>
            <FlexItem double>
              <ShowHideBtn handler={this.handlers.toggleExaminers} type="showExaminers" label={labelForSelectExaminers} />
              <ShowHideBtn handler={this.handlers.toggleSupport} type="showSupport" label={labelForSelectSupport} />
              {forSDSessions.length > 0
                && <ShowHideBtn handler={this.handlers.toggleSameDay} type="showSameDay" label={labelForSameDay}/>}
              {examinersOrSupport
                && <ShowHideBtn handler={this.handlers.toggleUnavailable} type="showUnavailable" label={labelForShowAll} />}
              {session.type.value === 'Writing' && session.examiners.value.length !== 0
                && <ShowHideBtn handler={this.handlers.toggle} type="showAssignSupervisors" label={labelForAssignSupervisors} />}
              {showExaminers 
                && <ExaminersAvailable 
                  data={availableExaminers} 
                  handlers={handlers} 
                  session={session} 
                  selectedExaminers={selectedExaminers}
                  showAssignSupervisors={showAssignSupervisors}
                  showUnavailable={showUnavailable} />}
              {showSupport 
                && <SupportAvailable 
                    data={availableSupport} 
                    handlers={handlers} 
                    session={session} 
                    selectedSupport={selectedSupport}
                    showUnavailable={showUnavailable} />}
              {showSameDay && forSDSessions.length !== 0
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
    selectedExaminers: state.op.sessionExaminers,
    availableSupport: state.op.supp_options,
    selectedSupport: state.op.sessionSupport,
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

