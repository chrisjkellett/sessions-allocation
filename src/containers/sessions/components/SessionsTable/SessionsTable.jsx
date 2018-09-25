import React from 'react';
import Table from '../../../../components/FormElements/Table/Table';
import classes from '../../Sessions.css';
import SessionDate from './components/SessionDate/SessionDate';
import SessionVenue from './components/SessionVenue/SessionVenue';
import SessionLevels from './components/SessionLevels/SessionLevels';
import EditBtn from '../../../../components/Btns/EditBtn/EditBtn';
import DeleteBtn from '../../../../components/Btns/DeleteBtn/DeleteBtn';

const SessionsTable = ({ sessions, handlers, venues, isConfirming }) => {
  return sessions === null ? null : (
    <div className={classes.SessionsTable}>
      <Table labels={['date', 'time', 'type', 'venue', 'levels', 'examiners', 'support', null]}>
        {sessions.map(session => {
          return (
            <tr className={classes.Row}>
              <SessionDate session={session} handleLink={handlers.handleLink} />
              <td>{session.time && session.time}</td>
              <td>{session.type && session.type}</td>
              <SessionVenue session={session} venues={venues} />
              <SessionLevels session={session} />
              <td>{session.examiners && session.examiners.join(" + ")}</td>
              <td>{session.support && session.support.join(" + ")}</td>
              <td>
                <EditBtn handler={null} id={session.id} />
                <span> | </span>
                <DeleteBtn handlers={handlers} data={session} isConfirming={isConfirming} />
              </td>
            </tr>
          )
        })}
      </Table>
    </div>
  )
}


export default SessionsTable;