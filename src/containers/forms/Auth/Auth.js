import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {constructAuthState} from '../../../store/constructors/auth';
import {renderUI} from './renders/';
import {updateState, forSubmit} from '../form-utility';
import {checkValidity} from '../validation/validation';
import {formatInput} from '../validation/utility';
import * as actions from '../../../store/actions/auth';

class Auth extends Component{
  state = {
    login: constructAuthState()
  }

  inputHandler = (event, id) => {
    const {value} = event.target;
    const type = Object.keys({...this.state})[0];
    const update = updateState(this.state, id, {value: formatInput(value, id)}, type);
    update[type][id].validation = checkValidity({...update[type][id]});
    this.setState(update);
  }

  submitHandler = (event) => {
    event.preventDefault();
    const user = forSubmit({...this.state.login});
    console.log(user);
    // // this.props.registerExaminerHandler(Object.assign({...user}, {returnSecureToken: true}));
  }

  render(){
    return(
      renderUI({...this.state.login}, this.inputHandler, this.submitHandler, this.props)
    )
  }
}

const mapStateToProps = state => {
  return {
    examiners: state.ex.examiners,
    user: state.auth.session_user,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return{
    // initialiseLogin: (examiners, userToBeChecked) => dispatch(actions.initialiseLogin(examiners, userToBeChecked)),
    registerExaminer: (user) => dispatch(actions.registerExaminer(user)) 
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));