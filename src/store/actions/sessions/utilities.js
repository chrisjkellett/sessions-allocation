import moment from 'moment';

export const filterOutOldSessions = (sessions) => {
  const yesterday = moment().subtract(1, 'days');
  return Object.keys(sessions)
    .filter(item => moment(sessions[item]['session_date'].join("-")) >= yesterday)
    .map(a => ({...sessions[a], id: a}))
}

export const assignIds = (sessions) => {
  return Object.keys(sessions)
    .map(a => ({...sessions[a], id: a}))
}
