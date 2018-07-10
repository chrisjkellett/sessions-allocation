import React from 'react';
import Input from '../../../../components/FormElements/Input/Input';
import {generateFormElementArray} from '../../../../gen-utility';
import {generateInputProps} from '../utility';
import {renderError} from './sub-renders';
import classes from '../Auth.css';
import {Redirect} from 'react-router-dom';
import * as routes from '../../../../store/app-data/routes';

export const renderUI = (state, inputHandler, submitHandler, {user, error, history}) => {
  if(user === null || error){
    return(
      <section className={classes.Auth}>
        <form onSubmit={submitHandler}>
          {generateFormElementArray(state)
            .map(element =>{
              return <Input {...generateInputProps(element, state, inputHandler)} />
            }
          )}
          <button onClick={() => history.push('/sessions')}>login</button>
          {renderError(error)}
        </form>
      </section>
    )
  }

  else{
    return <Redirect to={routes.EXAMINERS} />
  }

}