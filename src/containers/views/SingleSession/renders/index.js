import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from '../SingleSession.css';
import {renderAsDate} from './sub-renders';
import * as routes from '../../../../store/app-data/routes';

export const renderUL = (session) => {
  console.log(session);
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
            </tbody>
          </table>
        </div>

        <div>
          <table className={classes.Table}>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

