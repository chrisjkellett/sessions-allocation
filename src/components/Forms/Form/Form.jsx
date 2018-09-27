import React from 'react';
import classes from './Form.css';
import SubmitBtns from '../../Btns/SubmitBtns/SubmitBtns';

const Form = (props) => {
  const {handlers, label, extraLarge} = props;
  const styles = extraLarge ? [classes.Form, classes.ExtraLarge].join(" ") : [classes.Form]
  return (
    <div className={styles}>
      <form onSubmit={handlers.submit}>
        {props.children}
        <SubmitBtns label={label} edit={null} cancel={handlers.cancel} />
      </form>
    </div>
  )
}

export default Form;