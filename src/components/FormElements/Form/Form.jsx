import React from 'react';
import classes from './Form.css';
import SubmitBtns from '../../Btns/SubmitBtns/SubmitBtns';

const Form = (props) => {
  const {handlers, label} = props;
  return (
    <div className={classes.Form}>
      <form onSubmit={handlers.submit}>
        <div className={classes.FlexContainer}>
          <div className={classes.FlexItem}>
           {props.children}
          </div>
          <SubmitBtns label={label} edit={null} cancel={handlers.cancel} />
        </div>
      </form>
    </div>
  )
}

export default Form;