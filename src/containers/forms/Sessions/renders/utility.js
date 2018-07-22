import React from 'react';
import {checkType, checkLevels, checkOtherSessions} from './availability';
import {checkDay} from './availability';
import classes from '../../../css/views.css';
import availCSS from './availability.css';
import moment from 'moment';

export const generateInputProps = (element, state, changeHandler, examiners, sessions) => {
  const {config} = element
    return {
      key: element.id,
      label: element.id,
      options: examinerCheck(element, examiners, config, state.session, sessions),
      elementtype: config.elementType,
      elementConfig: config.elementConfig,
      value: config.value,
      valid: config.validation.valid,
      shouldValidate: state.shouldValidate,
      change: (event, index) => changeHandler(event, config.elementType, element.id, index)
    }
}

export const examinerCheck = (element, examiners, config, session, sessions) => {
  if(element.id === 'examiners' && examiners !== null){
    return examiners
      .filter(e => !e.roles.includes('Support staff') || e.roles.includes('Speaking Examiner'))
      .filter(e => checkType(e, session.type.value))
      .filter(e => checkLevels(e, session.levels.value))
      .filter(e => checkDay(e, session.session_date.value, session.time.value))
      .filter(e => checkOtherSessions(e, sessions))
      .map(e => e.name);
  }

  else if(element.id === 'support' && examiners !== null){
    return examiners
      .filter(e => e.roles.includes('Support staff'))
      .filter(e => checkDay(e, session.session_date.value, session.time.value))
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
  return errors.map((e, i) => (
    <span key={i}>
      <i className="fas fa-times"></i>
      {e}
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