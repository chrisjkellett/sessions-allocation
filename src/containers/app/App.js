import React, { Component } from 'react';
import classes from './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Auth from '../auth/Auth';
import Sessions from '../sessions/Sessions';
import Examiners from '../examiners/Examiners';
import Venues from '../venues/Venues.jsx';
import Wrapper from '../../components/Misc/Wrapper/Wrapper';
import {loadExaminers} from '../../store/actions/examiners/examiners';
import {loadSessions} from '../../store/actions/sessions/sessions';
import {checkAuthState} from '../../store/actions/auth/auth';
import * as venueActions from '../../store/actions/venues/venues';
import * as routes from '../../store/app-data/routes';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';

class App extends Component {
  constructor(props){
    super(props);
    this.handlers.tabViewer = this.handlers.tabViewer.bind(this);
  }

  componentDidMount(){
    this.props.loadExaminers();
    this.props.loadSessions();
    this.props.loadVenues();
    this.props.checkAuthState();
    document.addEventListener("keydown", this.handlers.tabViewer, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handlers.tabViewer, false);
  }

  handlers = {
    tabViewer: (e) => {
      const arr = [routes.SESSIONS, routes.EXAMINERS, routes.VENUES];
      const { isAuthenticated, hasFormActive } = this.props;
      if(isAuthenticated && !hasFormActive && e.keyCode === 9 && e.shiftKey) {
        e.preventDefault();
        const index = arr.indexOf(this.props.location.pathname);
        index - 1 < 0
        ? this.props.history.push(arr[arr.length - 1])
        : this.props.history.push(arr[index - 1]);
      }
      else if(isAuthenticated && !hasFormActive && e.keyCode === 9) {
        e.preventDefault();
        const index = arr.indexOf(this.props.location.pathname);
        index + 1 !== arr.length 
        ? this.props.history.push(arr[index + 1]) 
        : this.props.history.push(arr[0]); 
      }
    }
  }

  render() {
    const {isAuthenticated, examiners, periods, sessions} = this.props;
    return (
      <Wrapper>
        <Switch>
          <Route path={routes.LOGIN_PAGE} exact component={Auth} />
        </Switch>

        <Route path='/(.+)' render={() => (
          <AsyncLoad waitFor={examiners}>
          <AsyncLoad waitFor={sessions}>
            <Header />
            <section className={classes.Section}>
              <Switch>
                {isAuthenticated && <Route path={routes.EXAMINERS} exact component={Examiners} />}
                {isAuthenticated && <Route path={routes.VENUES} exact component={Venues} />}
                <AsyncLoad waitFor={periods}>
                  {isAuthenticated && <Route path={routes.SESSIONS} exact component={Sessions} /> }
                </AsyncLoad>
              </Switch>
            </section>
          </AsyncLoad>
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
    periods: state.per.periods,
    user: state.auth.session_user,
    selected: state.ex.selectedExaminer,
    hasFormActive: state.sess.formActive || state.ex.formActive || state.venue.formActive,
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
