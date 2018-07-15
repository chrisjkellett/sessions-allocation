import React from 'react';
import Input from '../../../../components/FormElements/Input/Input';
import {generateFormElementArray} from '../../../../gen-utility';
import {generateInputProps} from '../utility';
import Logo from '../../../../components/Logo/Logo';
import classes from '../Auth.css';



export const renderUI = (state, inputHandler, submitHandler) => {
    return(
      <section className={classes.Auth}>
        <Logo styles='Centre-Mid'/>
        <form onSubmit={submitHandler}>
          {generateFormElementArray(state)
            .map(element =>{
              return <Input {...generateInputProps(element, state, inputHandler)} />
            }
          )}
          <button>login</button>
          {/* {renderError(error)} */}
        </form>
      </section>
    )
}