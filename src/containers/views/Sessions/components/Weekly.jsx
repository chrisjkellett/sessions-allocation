import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from '../Sessions.css';
// import {handlePeriodSelect} from '../../../store/actions/periods';

class Sessions extends Component{
  state = {
    period: null
  }

  render(){
    return (
      <section className={classes.SplitWeekly}>
        <span className={classes.SmallLink}>split weekly</span>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    weeks: state.per.weeks
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));