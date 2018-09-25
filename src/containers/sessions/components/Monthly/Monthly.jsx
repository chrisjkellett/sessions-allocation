import React from 'react';
import classes from '../../Sessions.css';
import { generateInputProps } from './utility';
import { generateFormElementArray } from '../../../forms/form-utility';
import Input from '../../../../components/FormElements/Input/Input';

const Monthly = ({ props, period, periodHandler, sessions }) => {
   return props.periods !== null && props.periods.length > 1
    ? (
      <div className={classes.PeriodSubNav}>
        {generateFormElementArray(period)
          .map(element =>{
            return <Input {...generateInputProps(element, periodHandler, props, sessions)} />
          }
        )}
      </div>
      )
    : null
}

export default Monthly;