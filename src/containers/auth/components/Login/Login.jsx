import React from 'react';
import classes from './Login.css';
import { generateFormElementArray } from '../../../utility';
import { generateInputProps } from '../utility';
import { Input } from '../../../../components';

const Login = ({ login, handlers}) => {
  return(
    <div className={classes.Login}>
      <div className={classes.Wrapper}>
        <form onSubmit={handlers.submit}>
          {generateFormElementArray(login)
              .map(element =>{
                return <Input {...generateInputProps(element, login, handlers.change)} />
              }
            )}
          <button>login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;