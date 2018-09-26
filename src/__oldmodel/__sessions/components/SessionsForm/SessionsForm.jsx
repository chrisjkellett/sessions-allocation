import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../../../components/FormElements/Form/Form';
import Input from '../../../../components/FormElements/Input/Input';
import { generateFormElementArray } from '../../../utility';
import { generateInputProps } from './inputProps';
import * as examinerOptionActions from '../../../../store/actions/examiner-options/examiner-options';

class SessionsForm extends Component {
  componentDidMount(){
    const { examiners, state, sessions, selectedSession } = this.props;
    selectedSession && this.props.handlers.distributeValues(selectedSession);
    this.props.calculateAvailableExaminers(examiners, state.session, sessions);
  }

  componentWillUnmount(){
    this.props.clearSelectedSession();
  }
  
  render() {
    const { handlers, state, venues, availableExaminers, availableSupport, selectedSession } = this.props;
    const filterAvailable = availableExaminers.filter(e => e.available);
    const filterSupport = availableSupport.filter(e => e.available);
    const label = selectedSession !== null ? 'Save changes' : 'Add session';
    return (
      <Form handlers={handlers} label={label}>
        {generateFormElementArray(state.session)
          .map(element =>{
            return <Input {...generateInputProps(element, state, handlers, filterAvailable, filterSupport, venues)} />
          }
        )}
      </Form>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    calculateAvailableExaminers: (examiners, session, sessions) => dispatch(examinerOptionActions.calculateAvailableExaminers(examiners, session, sessions)),
    calculateSameDaySessions: (sessions, sessionDate) => dispatch(examinerOptionActions.calculateSameDaySessions(sessions, sessionDate)),
  }
}


export default connect(null, mapDispatchToProps)(SessionsForm);

