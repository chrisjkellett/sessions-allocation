import React from 'react';
import {generateFormElementArray, showHiddenFields, generateGroupClasses, generateGroups} from './utility';
import Input from '../../../components/FormElements/Input/Input';

export const renderSubmit = (edit) => {
  return(
    <button>{edit ? 'Save changes' : 'Add Examiner'}</button>
  )
}

export const renderFormElements = (state, changeHandler) => {
  return (
    generateFormElementArray(state.examiner).map(element =>(
        <Input 
          key={element.id}
          label={element.id}
          options={element.config.options}
          elementtype={element.config.elementType} 
          elementConfig={element.config.elementConfig}
          value={element.config.value} 
          hide={element.config.hide}
          activeGroup={state.activeGroup}
          group={element.config.group}
          showHidden={showHiddenFields(state.examiner)}
          valid={element.config.validation.valid}
          shouldValidate={state.shouldValidate}
          change={(event, index) => changeHandler(event, element.config.elementType, element.id, index)}/>
      )
    )
  )
}

export const renderGroupToolbar = (state, classes, groupChange) => {
  return(
    generateGroups(state.examiner).map(group =>(
      <span 
        key={group} 
        className={generateGroupClasses(classes, group, state.activeGroup)} 
        onClick={(event) => groupChange(event, group)}>{group}
      </span>
    ))
  )
}