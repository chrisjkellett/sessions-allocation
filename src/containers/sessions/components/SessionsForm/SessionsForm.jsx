import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionsFormContent from './SessionsFormContent.jsx';
import ExaminersAvailable from './Tables/ExaminersAvailable';
import * as exOpActions from '../../../../store/actions/examiner-options/examiner-options';
import { Form, FlexContainer, FlexItem, ShowHideBtn} from '../../../../components';

class SessionsForm extends Component {
  state = {
    showExaminers: false,
  }

  handlers = {
    open: (type) => {
      this.setState((prev) => ({ [type] : true }))
    }
  }

  componentDidMount(){
    const { venues } = this.props;
    // selectedSession && this.props.handlers.prepareForEdit(selectedSession);
    if(venues !== null) this.props.handlers.addAsyncForm(venues[0].name, 'venue'); 

    const { examiners, values, sessions } = this.props;
    this.props.calculateAvailableExaminers(examiners, values, sessions);
  }

  componentWillUnmount(){
    // this.props.clearSelectedSession();
  }
  
  render() {
    const { handlers, values, shouldValidate, selectedSession } = this.props;
    const { availableExaminers } = this.props;
    const { showExaminers } = this.state;
    const label = selectedSession !== null ? 'Save changes' : 'Add Session';
    return (
        <Form handlers={handlers} label={label} edit={selectedSession} extraLarge >
          <FlexContainer>
            <FlexItem>
              <SessionsFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={1} />    
            </FlexItem>
            <FlexItem double>
              {!showExaminers && <ShowHideBtn handler={this.handlers.open} type="showExaminers" label="select examiners"/>}
              {showExaminers && <ExaminersAvailable data={availableExaminers} handlers={handlers} session={values} />}
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
    availableExaminers: state.op.ex_options
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

