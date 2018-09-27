import React from 'react';
import { Input } from '../../../components/Forms';
import {generateFormElementArray} from '../../../gen-utility';
import {generateInputProps} from '../utility';
import {renderError} from './sub-renders';
import Logo from '../../../components/Logo/Logo';
import classes from '../Auth.css';

export const renderUI = (state, inputHandler, submitHandler, error, showErrors) => {
    return(
      <section className={classes.Auth}>
        <Logo styles='Centre-Mid'/>
        {error && showErrors && renderError(error)}
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