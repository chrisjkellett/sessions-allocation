import React, { Component } from 'react';
import classes from './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../header/Header';
// import Auth from './containers/forms/Auth/Auth';
import Examiners from '../views/Examiners/Examiners';
import Sessions from '../views/Sessions/Sessions';
import SingleExaminer from '../views/SingleExaminer/SingleExaminer';
import AddExaminers from '../forms/Examiners/Examiners';
import AddSessions from '../forms/Sessions/Sessions';
import Wrapper from '../../components/Misc/Wrapper/Wrapper';
import * as actions from '../../store/actions/examiners';
import * as routes from '../../store/app-data/routes';

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
