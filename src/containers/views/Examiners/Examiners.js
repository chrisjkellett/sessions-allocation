import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import classes from './Examiners.css';
import {examinerTableHeaders} from './utility';

import Table from '../../wrappers/Table/Table';
import Rows from './Rows/Rows';
import Loading from '../../../components/Misc/Loading';

class Examiners extends Component{
  componentDidMount(){
    this.props.loadExaminers();
  }

  render(){
    return (
      <section className={classes.Examiners}>
        <Table labels={examinerTableHeaders}>
          {this.props.examiners === null ? <Loading /> : this.props.examiners.map(examiner => (
            <Rows key={examiner.name} examiner={examiner} delete={() => this.props.deleteExaminer(examiner.id)}/>
          ))}
        </Table>
      </section>
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
    loadExaminers: () => dispatch(actions.loadExaminers()),
    deleteExaminer: (id) => dispatch(actions.deleteExaminer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examiners);