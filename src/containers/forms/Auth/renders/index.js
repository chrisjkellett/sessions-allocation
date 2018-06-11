import React from 'react';
import Input from '../../../../components/FormElements/Input/Input';
import {generateFormElementArray} from '../../../../gen-utility';
import {generateInputProps} from '../utility';
import {renderError} from './sub-renders';
import classes from '../Auth.css';
import {Redirect} from 'react-router-dom';

export const renderUI = (state, inputHandler, submitHandler, props) => {
  if(props.user === null || props.error){
    return(
      <section className={classes.Auth}>
        <form onSubmit={submitHandler}>
          {generateFormElementArray(state)
            .map(element =>{
              return <Input {...generateInputProps(element, state, inputHandler)} />
            }
          )}
          <button>login</button>
          {renderError(props.error)}
        </form>
      </section>
    )
  }

  else{
    return <Redirect to='/examiners' />
  }

}