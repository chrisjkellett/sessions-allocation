import React, { Component } from 'react';
import { Form, Input } from '../../../../components/Forms';
import { FlexItem } from '../../../../components/Layout';
import { generateInputProps } from './inputProps';
import { generateFormElementArray } from '../../../utility';

class VenuesForm extends Component {
  componentDidMount(){
    // const { selectedVenue } = this.props;
    // selectedVenue && this.props.handlers.fetchRecord(selectedVenue);
  }

  componentWillUnmount(){
    // this.props.clearSelectedVenue();
  }
  
  render() {
    const { handlers, values, shouldValidate, selectedExaminer } = this.props;
    const label = selectedExaminer !== null ? 'Save changes' : 'Add examiner';
    return (
        <Form handlers={handlers} label={label} extraLarge>
          <FlexItem>
            {generateFormElementArray(values)
              .filter(element => element.config.group === 'personal + roles')
              .map(element => <Input {...generateInputProps(element, shouldValidate, handlers)} />)
            }
          </FlexItem>
        </Form>
    )
  }
};


export default VenuesForm;

