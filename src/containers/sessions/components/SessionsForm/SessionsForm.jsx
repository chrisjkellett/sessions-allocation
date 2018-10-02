import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from '../../../../components/Forms';
import { FlexItem, FlexContainer } from '../../../../components/Layout';
import SessionsFormContent from './SessionsFormContent';

class SessionsForm extends Component {
  componentDidMount(){
    const { venues } = this.props;
    // selectedSession && this.props.handlers.prepareForEdit(selectedSession);
    if(venues !== null) this.props.handlers.addAsyncForm(venues[0].name, 'venue'); 
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
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionsForm));

