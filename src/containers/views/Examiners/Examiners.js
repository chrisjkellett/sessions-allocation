import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/examiners';
import classes from './Examiners.css';
import {examinerTableHeaders, renderName, renderRoles, renderLevels, renderAvailability, renderBtns} from './utility';
import Table from '../../wrappers/Table/Table';
import Loading from '../../../components/Misc/Loading';

class Examiners extends Component{
  componentDidMount(){
    this.props.loadExaminers();
  }

  handleEdit = (name) =>{
    this.props.editModeOn();
  }

  handleDelete = (id) => {
    this.props.deleteExaminer(id)
  }

  render(){
    return (
      <section className={classes.Examiners}>
        <Table labels={examinerTableHeaders}>
          {this.props.examiners === null ? <Loading /> : this.props.examiners.map(examiner => (
            <tr className={classes.Row}>
              {renderName(examiner)}
              {renderRoles(examiner, classes)}
              {renderLevels(examiner, classes)}
              {renderAvailability(examiner, classes)}
              {renderBtns(examiner, classes, this.handleDelete, this.handleEdit)}
            </tr>
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
    editModeOn: () => dispatch(actions.isEditing()),
    deleteExaminer: (id) => dispatch(actions.deleteExaminer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examiners);