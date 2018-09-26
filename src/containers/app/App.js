import React, { Component } from 'react';
import classes from './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Auth from '../auth/Auth';
import Sessions from '../sessions/Sessions';
import Examiners from '../examiners/Examiners';
import Venues from '../venues/Venues';
import Wrapper from '../../components/Misc/Wrapper/Wrapper';
import {loadExaminers} from '../../store/actions/examiners/examiners';
import {loadSessions} from '../../store/actions/sessions/sessions';
import {checkAuthState} from '../../store/actions/auth/auth';
import * as venueActions from '../../store/actions/venues/venues';
import * as routes from '../../store/app-data/routes';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';

class App extends Component {
  componentDidMount(){
    this.props.loadExaminers();
    this.props.loadSessions();
    this.props.loadVenues();
    this.props.checkAuthState();
  }

  render() {
    const {isAuthenticated, examiners} = this.props;
    return (
      <Wrapper>
        <Switch>
          <Route path={routes.LOGIN_PAGE} exact component={Auth} />
        </Switch>

        <Route path='/(.+)' render={() => (
          <AsyncLoad waitFor={examiners}>
            <Header />
            <section className={classes.Section}>
              <Switch>
                {isAuthenticated && <Route path={routes.EXAMINERS} exact component={Examiners} />}
                {isAuthenticated && <Route path={routes.VENUES} exact component={Venues} />}
                {isAuthenticated && <Route path={routes.SESSIONS} exact component={Sessions} /> }
              </Switch>
            </section>
          </AsyncLoad>
          )} />
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
  return {
    loadExaminers: () => dispatch(loadExaminers()),
    loadSessions: () => dispatch(loadSessions()),
    checkAuthState: () => dispatch(checkAuthState()),
    loadVenues: () => dispatch(venueActions.loadVenues())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
