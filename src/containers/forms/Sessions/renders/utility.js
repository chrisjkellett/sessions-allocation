import React from 'react';
import classes from '../../../css/views.css';
import availCSS from './availability.css';
import moment from 'moment';

export const generateInputProps = ({config, id}, state, changeHandler, filterAvailable, filterSupport) => {
    return {
      key: id,
      label: id,
      options: examinerCheck(id, filterAvailable, filterSupport, config),
      inline: config.inline,
      elementtype: config.elementType,
      elementConfig: config.elementConfig,
      value: config.value,
      valid: config.validation.valid,
      shouldValidate: state.shouldValidate,
      change: (event, index) => changeHandler(event, config.elementType, id, index)
    }
}

export const examinerCheck = (id, filterAvailable, filterSupport, config) => {
  if(id === 'examiners' && filterAvailable !== null){
    return filterAvailable
      .map(e => e.name);
  }

  else if(id === 'support' && filterSupport !== null){
    return filterSupport
      .map(e => e.name);
  }
  
  else{
    return config.options;
  }
}

export const generateStyles = (examiner) => {
  let styles = [classes.Row]
  if(!examiner.available){
    styles.push(availCSS.FailedTest)
  }
  return styles.join(" ");
}

export const generateErrorMessage = (examiner) => {
  let errors = [];
  if(examiner.avail.failsAvailability) errors.push('date'); 
  if(examiner.avail.failsLevel) errors.push('levels');
  if(examiner.avail.failsRoles) errors.push('roles');
  if(examiner.avail.failsIsBusy) errors.push('busy');
  if(examiner.avail.failsIsSupport) errors.push('is supporting');
  return errors.map((e, i) => (
    <span key={i} className={classes.NotAvailableError}>
      ⨯ {e}
    </span>)
    )
}

export const calculateDate = ({session}) => {
  return moment([...session.session_date.value].join("-")).format('dddd Do MMMM')
}

export const lastNameOnly = (names) => {
  let formattedNames = [];

  names.forEach(name => {
    let arr = name.split(" ");
    arr.shift();
    arr.join(" ")
    formattedNames.push(arr)
  })

  return formattedNames.join("-");
}