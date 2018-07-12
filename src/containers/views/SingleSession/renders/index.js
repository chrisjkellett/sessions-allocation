import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from '../SingleSession.css';
import {renderAsDate, renderSimple, renderExaminer} from './sub-renders';
import * as routes from '../../../../store/app-data/routes';

export const renderUL = ({session, examiners}) => {
  console.log(examiners);
  if(session === null){
    return <Redirect to={routes.SESSIONS} />
  }

  else{
    return(
      <div className={classes.SingleExaminer}>
        <div>
          <table className={classes.Table}>
            <tbody>
            {renderAsDate(session, 'session_date')}
            {renderSimple(session, 'venue')}
            </tbody>
          </table>
        </div>

        <div>
          <table className={classes.Table}>
            <tbody>
              {session.examiners.map(examiner => {
                return renderExaminer(session, examiners.find(ex => ex.name === examiner), 'examiners')
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

