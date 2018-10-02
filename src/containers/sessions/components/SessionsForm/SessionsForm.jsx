import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from '../../../../components/Forms';
import { FlexItem, FlexContainer } from '../../../../components/Layout';
import SessionsFormContent from './SessionsFormContent';
import * as exOpActions from '../../../../store/actions/examiner-options/examiner-options';

class SessionsForm extends Component {
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
            <FlexItem>
              <SessionsFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={2} />    
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

