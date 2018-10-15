import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Weekly.css';
import FilterPanel from './components/FilterPanel';
import * as actions from '../../../../store/actions/periods/periods'

export class UnconnectedWeekly extends Component{
  state = {
    showOptions: false
  }

  openOptions = () => {
    this.setState({ showOptions: true });
  }

  closeOptions = () => {
    this.setState({ showOptions: false });
    this.props.removeFilters();
  }


  render(){
    const { openOptions, closeOptions } = this;
    const { showOptions } = this.state;
    const { weeks, filterByWeek, sessions, weekFilteredBy } = this.props;
    
    return weeks !== null ? (
      <section className={classes.SplitWeekly}>
        { weeks.length <= 1 || (weeks.length > 1 && showOptions)
          ? null
          : <div id="split-btn" className={classes.SmallLink} onClick={openOptions}>filter by week</div>
        }

        { weeks.length > 1 && showOptions 
          ? <FilterPanel 
              weeks={weeks} 
              closeOptions={closeOptions} 
              weekFilteredBy={weekFilteredBy}
              filterByWeek={filterByWeek}
              sessions={sessions} /> 
          : null
          }
      </section>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    weeks: state.per.weeks,
    filterByWeek: state.per.filterByWeek,
    weekFilteredBy: state.per.weekFilteredBy,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterByWeek: (sessions, week) => dispatch(actions.handlePeriodSelectByWeek(sessions, week)),
    removeFilters: () => dispatch(actions.removeWeeklyFilters()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedWeekly);