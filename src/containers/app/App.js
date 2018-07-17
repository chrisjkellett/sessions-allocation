import React, { Component } from 'react';
import classes from './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Auth from '../forms/Auth/Auth';
import Examiners from '../views/Examiners/Examiners';
import Sessions from '../views/Sessions/Sessions';
import SingleExaminer from '../views/SingleExaminer/SingleExaminer';
import SingleSession from '../views/SingleSession/SingleSession';
import AddExaminers from '../forms/Examiners/Examiners';
import AddSessions from '../forms/Sessions/Sessions';
import Venues from '../forms/Venues/Venues';
import Wrapper from '../../components/Misc/Wrapper/Wrapper';
import {loadExaminers} from '../../store/actions/examiners/examiners';
import {loadSessions} from '../../store/actions/sessions';
import {checkAuthState} from '../../store/actions/auth/auth';
import * as routes from '../../store/app-data/routes';
import AsyncLoad from './components/AsyncLoad/AsyncLoad';
import AuthUser from './components/AuthUser/AuthUser';

class App extends Component {
  componentDidMount(){
    this.props.loadExaminers();
    this.props.loadSessions();
    this.props.checkAuthState();
  }

  render() {
    const {isAuthenticated, examiners, user} = this.props;
    return (
      <Wrapper>
        <Switch>
          <Route path={routes.LOGIN_PAGE} exact component={Auth} />
        </Switch>

        <AuthUser user={user}>
        <Route path='/(.+)' render={() => (
          <AsyncLoad waitFor={examiners}>
            <Header />
            <section className={classes.Section}>
              <Switch>
                {isAuthenticated && <Route path={routes.ADD_EXAMINER} exact component={AddExaminers} />}
                <Route path={routes.EDIT_EXAMINER} exact component={AddExaminers}/>
                {isAuthenticated && <Route path={routes.EXAMINERS} exact component={Examiners} />}
                {isAuthenticated && <Route path={routes.VENUES} exact component={Venues} />}
                <Route path={routes.SINGLE_EXAMINER_VIEW} exact component={SingleExaminer} />
                <Route path={routes.SESSIONS} exact component={Sessions} />
                {isAuthenticated && <Route path={routes.ADD_SESSION} exact component={AddSessions} />}
                {isAuthenticated && <Route path={routes.EDIT_SESSION} exact component={AddSessions}/>}
                <Route path={routes.SINGLE_SESSION_VIEW} exact component={SingleSession} />
              </Switch>
            </section>
          </AsyncLoad>
          )} />
          </AuthUser>
      </Wrapper>

    );
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    isAuthenticated: state.auth.token !== null && state.auth.token !== '9999',
    examiners: state.ex.examiners,
    user: state.auth.session_user,
    selected: state.ex.selectedExaminer
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadExaminers: () => dispatch(loadExaminers()),
    loadSessions: () => dispatch(loadSessions()),
    checkAuthState: () => dispatch(checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
