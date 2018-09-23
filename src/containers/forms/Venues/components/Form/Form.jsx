import React from 'react';
import Input from '../../../../../components/FormElements/Input/Input';
import classes from './Form.css';
import SubmitBtns from '../SubmitBtns/SubmitBtns';
import { generateFormElementArray, generateInputProps } from './utility';

const Form = ({ handlers, values, shouldValidate, showForm }) => {
  return !showForm ? null :(
    <div className={classes.VenueForm}>
      <form onSubmit={handlers.submit}>
        <div className={classes.FlexContainer}>
          <div className={classes.FlexItem}>
            {generateFormElementArray(values)
              .map(element =>{
                return <Input {...generateInputProps(element, shouldValidate, handlers)} />
              }
            )}
          </div>
          <SubmitBtns label='Add venue' edit={null} cancel={handlers.cancel} />
        </div>
      </form>
    </div>
  )
}

export default Form;

