import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from '../Sessions.css';
// import {handlePeriodSelect} from '../../../store/actions/periods';

class Sessions extends Component{
  state = {
    showOptions: false
  }

  openOptions = () => {
    this.setState({ showOptions: true });
  }

  closeOptions = () => {
    this.setState({ showOptions: false });
  }

  componentDidUpdate(){
    console.log(this.props.weeks)
  }


  render(){
    const { openOptions, closeOptions } = this;
    const { showOptions } = this.state;
    const { weeks } = this.props;
    
    return weeks !== null ? (
      <section className={classes.SplitWeekly}>
        { weeks.length === 1 || (weeks.length > 1 && showOptions)
          ? null
          : <span className={classes.SmallLink} onClick={openOptions}>split weekly</span>
        }

        { weeks.length > 1 && showOptions 
          ? (<span>
              {weeks.map(week => <span key="week" className={classes.SmallLink}>{week}</span>)}
              <span className={classes.CloseFilter} onClick={closeOptions}>✖</span>
            </span>) 
          : null
          }
      </section>
    ) : null
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default withRouter(connect(null, mapDispatchToProps)(Sessions));