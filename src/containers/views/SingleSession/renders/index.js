import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from '../SingleSession.css';
import {renderAsDate, renderSimple, renderExaminer, renderArrayAsIcons, renderArrivalTime} from './sub-renders';
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
            {renderSimple(session, 'time')}
            {renderArrivalTime(session, 'arrival time')}
            {renderSimple(session, 'venue')}
            {renderArrayAsIcons(session, 'levels')}
            {renderSimple(session, 'type')}
            {renderSimple(session, 'support')}
            {renderSimple(session, 'notes')}
            </tbody>
          </table>
        </div>

        <div>
        {session.examiners.map((examiner, i) => {
          return (
            <div key={examiner} className={classes.StackedTable}>
              <table className={classes.Table}>
                <tbody>
                  {renderExaminer(session, examiners.find(ex => ex.name === examiner), 'examiner ' + (i + 1))}
                </tbody>
              </table>
            </div>
          )
        })}
        </div>
    </div>
    )
  }
}

