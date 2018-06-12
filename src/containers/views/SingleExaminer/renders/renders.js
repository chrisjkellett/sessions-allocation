import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from '../SingleExaminer.css';
import {renderSimple, renderArrayAsDayIcons, renderArray, renderArrayAsIcons, renderAsDate} from './sub-renders';
import * as routes from '../../../../store/app-data/routes';

export const renderUL = (examiner) => {
  if(examiner === null){
    return <Redirect to={routes.EXAMINERS} />
  }

  else{
    return(
      <div className={classes.SingleExaminer}>
        <div>
          <table className={classes.Table}>
            <tbody>
            {renderSimple(examiner, 'name')}
            {renderSimple(examiner, 'email')}
            {renderArrayAsDayIcons(examiner, 'availability')}
            {renderArray(examiner, 'roles')}
            {renderSimple(examiner, 'id_number')}
            </tbody>
          </table>
        </div>

        <div>
          <table className={classes.Table}>
            <tbody>
            {renderArrayAsIcons(examiner, 'levels')}
            {renderAsDate(examiner, 'last_monitoring')}
            {renderArrayAsIcons(examiner, 'monitoring_level')}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

