import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners';
import classes from './Examiners.css';
import {examinerTableHeaders, renderName, renderRoles, renderLevels, renderAvailability, renderBtns, formatURL} from './utility';
import Table from '../../wrappers/Table/Table';
import Loading from '../../../components/Misc/Loading';

class Examiners extends Component{

  handleEdit = (name) =>{
    this.props.editModeOn();
    this.props.fetchExaminerForEditing(name);
    this.props.history.push('/examiners/edit/' + formatURL(name));
  }

  handleDelete = (id) => {
    this.props.deleteExaminer(id)
  }

  generateTableContents = () => {
    if(this.props.examiners === null){
      return <Loading />
    }
    
    else{
      return (
        this.props.examiners.map(examiner => (
          <tr className={classes.Row} key={examiner.name}>
            {renderName(examiner)}
            {renderRoles(examiner, classes)}
            {renderLevels(examiner, classes)}
            {renderAvailability(examiner, classes)}
            {renderBtns(examiner, classes, this.handleDelete, this.handleEdit)}
          </tr>
      )))
    }
  }

  render(){
    return (
      <section className={classes.Examiners}>
        <Table labels={examinerTableHeaders}>
          {this.generateTableContents()}
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
    editModeOn: () => dispatch(actions.isEditing()),
    fetchExaminerForEditing: (id) => dispatch(actions.fetchExaminerForEditing(id)),
    deleteExaminer: (id) => dispatch(actions.deleteExaminer(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));