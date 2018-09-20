import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from '../../Sessions.css';
import FilterPanel from './components/FilterPanel';
import * as actions from '../../../../../store/actions/periods/periods'

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
    const { weeks, filterByWeek, sessions } = this.props;
    
    return weeks !== null ? (
      <section className={classes.SplitWeekly}>
        { weeks.length <= 1 || (weeks.length > 1 && showOptions)
          ? null
          : <span id="split-btn" className={classes.SmallLink} onClick={openOptions}>filter by week</span>
        }

        { weeks.length > 1 && showOptions 
          ? <FilterPanel 
              weeks={weeks} 
              closeOptions={closeOptions} 
              filterByWeek={filterByWeek}
              sessions={sessions} /> 
          : null
          }
      </section>
    ) : null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    filterByWeek: (sessions, week) => dispatch(actions.handlePeriodSelectByWeek(sessions, week)),
    removeFilters: () => dispatch(actions.removeWeeklyFilters()),
  }
}

export default connect(null, mapDispatchToProps)(UnconnectedWeekly);