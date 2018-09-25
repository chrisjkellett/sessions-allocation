import React, { Component } from 'react';
import Form from '../../../../components/FormElements/Form/Form';
// import Input from '../../../../components/FormElements/Input/Input';

class SessionsForm extends Component {
  componentDidMount(){

  }

  componentWillUnmount(){

  }
  
  render() {
    const { handlers } = this.props;
    return (
      <Form handlers={handlers} label={'Add new session'}>
      <div>Hello world</div>
      </Form>
    )
  }
};


export default SessionsForm;

