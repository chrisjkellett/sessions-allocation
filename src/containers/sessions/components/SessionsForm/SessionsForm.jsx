import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../../../components/FormElements/Form/Form';
import Input from '../../../../components/FormElements/Input/Input';
import { generateFormElementArray } from '../../../utility';
import { generateInputProps } from './inputProps';
import * as examinerOptionActions from '../../../../store/actions/examiner-options/examiner-options';

class SessionsForm extends Component {
  componentDidMount(){
    const { examiners, state, sessions } = this.props;
    this.props.calculateAvailableExaminers(examiners, state.session, sessions);
  }

  componentWillUnmount(){

  }
  
  render() {
    const { handlers, state, venues, availableExaminers, availableSupport } = this.props;
    const filterAvailable = availableExaminers.filter(e => e.available);
    const filterSupport = availableSupport.filter(e => e.available);
    return (
      <Form handlers={handlers} label={'Add new session'}>
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

