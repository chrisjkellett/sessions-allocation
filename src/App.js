import React, { Component } from 'react';
import classes from './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './containers/header/Header';
// import Auth from './containers/forms/Auth/Auth';
import Examiners from './containers/views/Examiners/Examiners';
import Sessions from './containers/views/Sessions/Sessions';
import SingleExaminer from './containers/views/SingleExaminer/SingleExaminer';
import AddExaminers from './containers/forms/Examiners/Examiners';
import AddSessions from './containers/forms/Sessions/Sessions';
import Wrapper from './components/Misc/Wrapper/Wrapper';
import * as actions from './store/actions/examiners';
import * as routes from './store/app-data/routes';

class App extends Component {
  componentDidMount(){
    this.props.loadExaminers();
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <section className={classes.Section}>
          <Switch>
              <Route path={routes.LOGIN_PAGE} exact component={Examiners} />
              <Route path={routes.ADD_EXAMINER} exact component={AddExaminers} />
              <Route path={routes.EDIT_EXAMINER} exact component={AddExaminers}/>
              <Route path={routes.EXAMINERS} exact component={Examiners} />
              <Route path={routes.SINGLE_EXAMINER_VIEW} exact component={SingleExaminer} />
              <Route path={routes.SESSIONS} exact component={Sessions} />
              <Route path={routes.ADD_SESSION} exact component={AddSessions} />
          </Switch>
        </section>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadExaminers: () => dispatch(actions.loadExaminers())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
