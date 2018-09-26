import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from '../SingleExaminer.css';
import {
  renderSimple, 
  renderArrayAsDayIcons, 
  renderArray, 
  renderArrayAsIcons, 
  renderAsDate, 
  renderSessionDate} from './sub-renders';
import * as routes from '../../../../store/app-data/routes';

export const renderUL = (examiner, sessions) => {
  if(examiner === null){
    return <Redirect to={routes.EXAMINERS} />
  }

  else{
    const mysessions = sessions.filter(s => s.examiners.includes(examiner.name) || s.support.includes(examiner.name));
    const isSE = examiner.roles.includes('Speaking Examiner');
    return(
      <div className={classes.SingleExaminer}>
        <div>
          <table className={classes.Table}>
            <tbody>
            {renderSimple(examiner, 'name')}
            {renderSimple(examiner, 'email')}
            {renderSimple(examiner, 'phone')}
            {renderSimple(examiner, 'date of birth')}
            {renderArrayAsDayIcons(examiner, 'availability')}
            {renderArray(examiner, 'roles')}
            {isSE && renderSimple(examiner, 'id_number')}
            </tbody>
          </table>
        </div>

        <div>
          <table className={classes.Table}>
            <tbody>
            {isSE && renderArrayAsIcons(examiner, 'levels')}
            {isSE && renderAsDate(examiner, 'last_monitoring')}
            {isSE && examiner.monitoring_level && renderArrayAsIcons(examiner, 'monitoring_level')}
            {renderSessionDate(mysessions, 'next session')}
            {renderSimple(examiner, 'notes')}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

