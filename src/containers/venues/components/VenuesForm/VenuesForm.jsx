import React, { Component } from 'react';
import { Form, Input } from '../../../../components/Forms';
import { generateInputProps } from './inputProps';
import { generateFormElementArray } from '../../../utility';

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
      <Form handlers={handlers} label={label} edit={selectedVenue}>
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

