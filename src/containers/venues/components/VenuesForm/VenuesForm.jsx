import React, { Component } from 'react';
import Form from '../../../../components/FormElements/Form/Form';
import Input from '../../../../components/FormElements/Input/Input';
import classes from './VenuesForm.css';
import SubmitBtns from '../../../../components/Btns/SubmitBtns/SubmitBtns';
import { generateFormElementArray, generateInputProps } from './utility';

class VenuesForm extends Component {
  componentDidMount(){
    const { selectedVenue } = this.props;
    selectedVenue && this.props.handlers.fetchRecord(selectedVenue);
  }

  componentWillUnmount(){
    this.props.clearSelectedVenue();
  }
  
  render() {
    const { handlers, values, shouldValidate, selectedVenue } = this.props;
    const label = selectedVenue !== null ? 'Save changes' : 'Add venue';
    return (
      <Form handlers={handlers} label={label}>
        {generateFormElementArray(values)
          .map(element =>{
            return <Input {...generateInputProps(element, shouldValidate, handlers)} />
          }
        )}
      </Form>
    )
  }
};


export default VenuesForm;

