import React from 'react';
import classes from '../../../css/views.css';
import availCSS from './availability.css';
import moment from 'moment';

export const generateInputProps = ({config, id}, state, handlers, filterAvailable, filterSupport, venues) => {
    return {
      key: id,
      label: id,
      options: dynamicOptionCheck(id, filterAvailable, filterSupport, config, venues),
      inline: config.inline,
      elementtype: config.elementType,
      elementConfig: config.elementConfig,
      hasControls: {controls: config.hasControls, handler: handlers.resetExaminers},
      value: hasAsyncValue(id, config, venues),
      valid: config.validation.valid,
      shouldValidate: state.shouldValidate,
      change: (event, index) => handlers.change(event, config.elementType, id, index)
    }
}

export const hasAsyncValue = (id, config, venues) => {
  return id === 'venue' ? venues[0].name : config.value; 
}

export const dynamicOptionCheck = (id, filterAvailable, filterSupport, config, venues) => {
  if(id === 'examiners' && filterAvailable !== null){
    return filterAvailable
      .map(e => e.name);
  }

  else if(id === 'support' && filterSupport !== null){
    return filterSupport
      .map(e => e.name);
  }

  else if(id === 'venue' && filterAvailable !== null){
    return venues
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
  if(examiner.avail.failsIsExaminer) errors.push('is examining');
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