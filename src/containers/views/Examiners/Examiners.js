import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners/examiners';
import classes from './Examiners.css';
import {examinerTableHeaders} from '../../../store/app-data/table-headers';
import {formatURL} from '../../../gen-utility';
import {renderTableContent} from './renders/';
import Table from '../../../components/FormElements/Table/Table';


class Examiners extends Component{
  componentDidMount(){
    this.props.deActivateSelectedExaminer();
  }

  handleEdit = (examiner) =>{
    this.props.fetchExaminer(examiner);
    this.props.history.push('/examiners/edit/' + formatURL(examiner.name));
  }

  handleDelete = (examiner) => {
    const {token, deleteExaminer} = this.props;
    deleteExaminer(examiner, token)
  }

  handleLink = (examiner) => {
    this.props.fetchExaminer(examiner);
    this.props.history.push('/examiners/' + formatURL(examiner.name));
  }

  render(){
    return (
      <section className={classes.Examiners}>
        <Table labels={examinerTableHeaders}>
          {renderTableContent(this.props, this.handleDelete, this.handleEdit, this.handleLink)}
        </Table>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null && state.auth.token !== '9999',
    user: state.auth.session_user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchExaminer: (id) => dispatch(actions.fetchExaminer(id)),
    deleteExaminer: (examiner, token) => dispatch(actions.deleteExaminer(examiner, token)),
    deActivateSelectedExaminer: () => dispatch(actions.deActivateSelectedExaminer())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Examiners));