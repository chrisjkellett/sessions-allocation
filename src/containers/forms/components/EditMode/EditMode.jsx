import React from 'react'
import {Redirect} from 'react-router-dom';
import {ADD_EXAMINER} from '../../../../store/app-data/routes';

const EditMode = ({children, exEdit, match}) => {
  if(!exEdit && match.path !== ADD_EXAMINER)
    return <Redirect to={ADD_EXAMINER} />
  else  
    return children;
}

export default EditMode
