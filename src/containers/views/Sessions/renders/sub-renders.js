import React from 'react';
import classes from '../Sessions.css';

export const renderDate = (session) => {
  return  (
    <td>
     {session.fullDate} 
    </td>
  )
}

export const renderType = (session) => {
  return (
    <td>
      {session.sessionType}
    </td>
  )
}

export const renderVenue = (session) => {
  return (
    <td>
      {session.venue}
    </td>
  )
}

export const renderLevels = (session) => {
  return (
    <td>
      {session.levels
        .map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
      })}
    </td>
  )
}

export const renderExaminers = (session) => {
  return (
    <td>
      {session.examiners.join(" + ")}
    </td>
  )
}

export const renderSupport = (session) => {
  return (
    <td>
      {session.support.join(" + ")}
    </td>
  )
}