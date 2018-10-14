import React, { Component } from 'react';
import { Form } from '../../../../components/Forms';
import { FlexItem, FlexContainer } from '../../../../components/Layout';
import ExaminersFormContent from './ExaminersFormContent';

class VenuesForm extends Component {
  componentDidMount(){
    const { selectedExaminer } = this.props;
    selectedExaminer && this.props.handlers.prepareForEdit(selectedExaminer);
    document.getElementById('$name').focus();
  }

  componentWillUnmount(){
    this.props.clearSelectedExaminer();
  }
  
  render() {
    const { handlers, values, shouldValidate, selectedExaminer, extraLarge } = this.props;
    const label = selectedExaminer !== null ? 'Save changes' : 'Add examiner';
    return (
        <Form handlers={handlers} label={label} edit={selectedExaminer} expand={true} extraLarge={extraLarge}>
          <FlexContainer>
            <FlexItem>
              <ExaminersFormContent 
                values={values} 
                handlers={handlers} 
                shouldValidate={shouldValidate} 
                group={1} />    
            </FlexItem>
            <FlexItem>
              <ExaminersFormContent 
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


export default VenuesForm;

