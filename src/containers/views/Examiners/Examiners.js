import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';

class Examiners extends Component{
  componentDidMount(){
    this.props.loadExaminers()
  }

  render(){
    return (
      <ul>
        {this.props.examiners === null ? null : this.props.examiners.map(examiner => {
          return <li key={examiner.name}>{examiner.name}</li>
        })}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.examiners
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadExaminers: () => dispatch(actions.loadExaminers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examiners);