import React from 'react';
import classes from '../../../css/views.css';
import {
  renderFormElements, 
  renderBtns, 
  renderAvailableExaminers, 
  renderUnAvailableExaminers,
  renderFilter,
  renderHeader,
  renderSameDaySessions} from './sub-renders';
import {calculateDate} from './utility';
import Wrapper from '../../../../components/Misc/Wrapper/Wrapper';
import Table from '../../../../components/FormElements/Table/Table';
import availCSS from './availability.css';

export const renderUI = (state, props, handlers) => {
  const {examiners, sessions, availableExaminers, sameDaySessions} = props;
  const filterAvailable = availableExaminers.filter(e => e.available);
  return(
    <section>
      <form onSubmit={handlers.submit}>
        <div className={classes.Container}>
          <div className={classes.Box}>
            {renderFormElements(state, handlers, examiners, sessions)}
            {renderBtns(handlers, props.sessionForEditing)}
          </div>
          <div className={classes.Box}>
            <Table labels={[renderHeader(filterAvailable), renderFilter(handlers)]}>
              {filterAvailable.length !== 0 ?
                <Wrapper>
                {renderAvailableExaminers(filterAvailable, state)}
                {renderUnAvailableExaminers(availableExaminers, state)}
                </Wrapper> : <tr><td>No examiners available</td></tr>
              }
            </Table>

            {sameDaySessions.length !== 0 &&
            <div>
              <p>Other sessions on <span className={availCSS.Bolder}>{calculateDate(state)}</span>
                <span className={availCSS.Count}>{sameDaySessions.length}</span>
              </p>
              <Table labels={['venue', 'time', 'level', 'examiners']}>
                {renderSameDaySessions(sameDaySessions)}
              </Table>
            </div>}
          </div>
        </div>
        </form>
    </section>
  )
}