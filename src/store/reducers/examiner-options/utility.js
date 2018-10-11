import * as check from './checks';
import moment from 'moment';
import {timeKeys} from '../../data';
import { Availability } from '../utility';

const clone = src => Object.assign({}, src);

export const examinerCheck = ({examiners, session, sessions, sessionId}) => {
  return examiners
    .map(e => ({ ...e, avail: Availability(), available: true }))
    .filter(e => !e.roles.includes('Support staff') || e.roles.includes('Speaking Examiner'))
    .map(e => check.type(e, session.type.value))
    .map(e => check.levels(e, session.levels.value, session.type.value))
    .map(e => check.day(e, session.session_date.value, session.time.value))
    .map(e => check.isBusy(e, sameDayCheck(sessions, session, sessionId), session.time.value))
    .map(e => check.isSupportAlso(clone(e), session.support.value))
    .map(e => check.isAvailable(e))
}

export const supportCheck = ({examiners, session, sessions, sessionId}) => {
  return examiners
    .map(e => ({ ...e, avail: Availability(), available: true }))
    .filter(e => e.roles.includes('Support staff'))
    .map(e => check.day(e, session.session_date.value, session.time.value))
    .map(e => check.isBusy(e, sameDayCheck(sessions, session, sessionId), session.time.value))
    .map(e => check.isExaminerAlso(clone(e), session.examiners.value))
    .map(e => check.isAvailable(e))
}

export const sameDayCheck = (sessions, session, sessionId) => {
  return sessions === null ? [] : sessions.filter(s => s.id !== sessionId && moment(s.session_date).isSame(session.session_date.value));
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
  return objA.am === objB.am;
};

export const selectExaminer = (arr, examiner) => {
  if(arr.includes(examiner))
    return arr.filter(e => e !== examiner)
  else 
    return arr.concat(examiner)
}

export const compareAvailableAndSelected = (available, selected) => {
  return available
    .filter(e => e.available)
    .map(e => e.name)
    .filter(e => selected.includes(e))
}