import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/examiners/examiners';
import classes from './Examiners.css';
import {formatURL} from '../../../gen-utility';
import {renderTableContent} from './renders/';
import {renderFilterBtn} from './renders/sub-renders';
import Table from '../../../components/FormElements/Table/Table';


class Examiners extends Component{
  state = {
    showFilters: false
  }

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

  handlers = {
    toggleFilters: () => {
      this.setState(prev => ({
        showFilters: prev.showFilters ? false : true
      }));
    }
  }

  render(){
    const {showFilters} = this.state;
    const headers = ['examiner name', 'availability', 'levels', renderFilterBtn(showFilters, this.handlers)];
    return (
      <section className={classes.Examiners}>
        <Table labels={showFilters ? ['filter', null, null, renderFilterBtn(showFilters, this.handlers)] : headers}>
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