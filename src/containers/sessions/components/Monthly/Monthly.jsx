import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../store/actions/periods/periods';

class Monthly extends Component {
  changeHandler = (e) => {
    const { sessions } = this.props;
    this.props.periodSelect(sessions, e.target.value)
  }

  render(){  
    const { periods, currentPeriod } = this.props;
    return (
     <div>
      <label>periods</label>
        <select value={currentPeriod} onChange={this.changeHandler}>
          {periods.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    periods: state.per.periods,
    currentPeriod: state.per.current,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    periodSelect: (sessions, period) => dispatch(actions.handlePeriodSelect(sessions, period))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Monthly));