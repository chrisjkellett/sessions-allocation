import React, { Component } from 'react';
import { Form } from '../../../../components/Forms';
import { FlexItem, FlexContainer } from '../../../../components/Layout';
// import SessionsFormContent from './SessionsFormContent';

class SessionsForm extends Component {
  componentDidMount(){
    // const { selectedSession } = this.props;
    // selectedSession && this.props.handlers.prepareForEdit(selectedSession);
  }

  componentWillUnmount(){
    // this.props.clearSelectedSession();
  }
  
  render() {
    const { handlers, values, shouldValidate, selectedSession, extraLarge } = this.props;
    const label = selectedSession !== null ? 'Save changes' : 'Add Session';
    return (
        <Form handlers={handlers} label={label} edit={selectedSession}>
          <FlexContainer>
            <FlexItem>
              {/* <SessionsFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={1} />     */}
            </FlexItem>
            <FlexItem>
              {/* <SessionsFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={2} />     */}
            </FlexItem>
          </FlexContainer>
        </Form>
    )
  }
};


export default SessionsForm;

