import React, {Component} from 'react';
import classes from './Header.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as navElements from './renders/';
import { refreshLog } from '../../store/actions/general/general';
import { logout } from '../../store/actions/auth/auth';
import { Link } from '../../components';
import * as routes from '../../store/app-data/routes';
import Logout from './components/Logout/Logout';
import UpdateLog from './components/UpdateLog/UpdateLog';

class Header extends Component{
  componentWillReceiveProps(next){
    const {updatedLog, refreshLog, error} = this.props;
    if(next.updatedLog !== updatedLog || next.error !== error){
      setTimeout(() => {  
        refreshLog();
      }, 4000);
    }
  }

  logoutHandler = () => {
    const {history, logout} = this.props;
    logout();
    history.push('/');
  }

  render(){
    const {updatedLog, mapOfLog, error, serverError, isAuthenticated} = this.props;
    return(
      <div className={classes.Header}>
        <ul>
          <Link route={routes.SESSIONS} isAuthenticated={isAuthenticated}/>
          <Link route={routes.EXAMINERS} isAuthenticated={isAuthenticated}/>
          <Link route={routes.VENUES} isAuthenticated={isAuthenticated}/>
          <Logout logout={this.logoutHandler}/>
        </ul>
        {updatedLog && <UpdateLog update={updatedLog} map={mapOfLog} />}
        {error && !serverError && navElements.renderErrorLog(error, mapOfLog)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    selectedSession: state.sess.selectedSession,
    user: state.auth.session_user,
    updatedLog: state.gen.updated,
    mapOfLog: state.gen.map,
    error: state.gen.error,
    serverError: state.gen.serverError,
    isAuthenticated: state.auth.token !== null && state.auth.token !== '9999'
  }
}

const mapDispatchToProps = dispatch => {
  return{
    refreshLog: () => dispatch(refreshLog()),
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));