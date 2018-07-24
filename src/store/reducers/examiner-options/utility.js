import * as check from './checks';
import moment from 'moment';
import {timeKeys} from '../../data';

export const examinerCheck = ({examiners, session, sessions}) => {
  return examiners
    .filter(e => !e.roles.includes('Support staff') || e.roles.includes('Speaking Examiner'))
    .map(e => check.type(e, session.type.value))
    .map(e => check.levels(e, session.levels.value))
    .map(e => check.day(e, session.session_date.value, session.time.value))
    .map(e => check.isBusy(e, sameDayCheck({sessions: sessions, sessionDate: session.session_date.value}), session.time.value))
    .map(e => check.isAvailable(e))
}

export const supportCheck = ({examiners, session}) => {
  return examiners
    .filter(e => e.roles.includes('Support staff'))
    .map(e => check.day(e, session.session_date.value, session.time.value))
    // .filter(e => checkOtherSessions(e, sessions))
    .map(e => check.isAvailable(e))
}

export const sameDayCheck = ({sessions, sessionDate}) => {
  return sessions.filter(s => moment(s.session_date).isSame(sessionDate));
}

export const filterExaminers = ({examiners, filterValue}) => {
  const {length} = filterValue;
  return examiners
    .filter(e => e.roles.includes('Speaking Examiner') || e.roles.includes('Supervisor'))
    .filter(e => e.name.substring(0, length).toLowerCase() === filterValue.toLowerCase());
}

export const filterSupport = ({support, filterValue}) => {
  const {length} = filterValue;
  return support
    .filter(e => e.roles.includes('Support staff'))
    .filter(e => e.name.substring(0, length).toLowerCase() === filterValue.toLowerCase());
}

export const isSameTime = (a, b) => {
  const objA = timeKeys.find(t => t.time === a)
  const objB = timeKeys.find(t => t.time === b);
  console.log(objA);
  console.log(objB);
  console.log(objA.am === objB.am)
  return objA.am === objB.am;
}