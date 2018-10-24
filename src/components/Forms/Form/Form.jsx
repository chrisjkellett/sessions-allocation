import React from 'react';
import classes from './Form.css';
import SubmitBtns from '../../Btns/SubmitBtns/SubmitBtns';

const Form = (props) => {
  const {handlers, label, extraLarge, expand} = props;
  const styles = extraLarge ? [classes.Form, classes.ExtraLarge].join(" ") : [classes.Form]
  return (
    <div className={classes.FormContainer}>
      <div className={styles}>
        <form onSubmit={handlers.submit}>
          {props.children}
          <SubmitBtns label={label} handlers={handlers} expand={expand}/>
        </form>
      </div>
    </div>
  )
}

export default Form;