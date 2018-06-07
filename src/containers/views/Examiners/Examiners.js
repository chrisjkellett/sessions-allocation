import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners';
import classes from './Examiners.css';
import {examinerTableHeaders, formatURL} from './utility';
import {renderTableContent} from './renders';
import Table from '../../wrappers/Table/Table';


class Examiners extends Component{
  componentDidMount(){
    this.props.deActivateSelectedExaminer();
  }

  handleEdit = (examiner) =>{
    this.props.fetchExaminerForEditing(examiner);
    this.props.history.push('/examiners/edit/' + formatURL(examiner.name));
  }

  handleDelete = (id) => {
    this.props.deleteExaminer(id)
  }

  render(){
    return (
      <section className={classes.Examiners}>
        <Table labels={examinerTableHeaders}>
          {renderTableContent(this.props.examiners, this.handleDelete, this.handleEdit)}
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
    fetchExaminerForEditing: (id) => dispatch(actions.fetchExaminerForEditing(id)),
    deleteExaminer: (id) => dispatch(actions.deleteExaminer(id)),
    deActivateSelectedExaminer: () => dispatch(actions.deActivateSelectedExaminer())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));