import React from 'react';
import {Route, Switch} from 'react-router-dom';
import classes from '../App.css';
import Header from '../../header/Header';
import Auth from '../../forms/Auth/Auth';
import Examiners from '../../views/Examiners/Examiners';
import Sessions from '../../views/Sessions/Sessions';
import SingleExaminer from '../../views/SingleExaminer/SingleExaminer';
import AddExaminers from '../../forms/Examiners/Examiners';
import AddSessions from '../../forms/Sessions/Sessions';
import Wrapper from '../../../components/Misc/Wrapper/Wrapper';
import * as routes from '../../../store/app-data/routes';

export const renderRoutes = () => {
  return(
    <Wrapper>
      <Header />
        <section className={classes.Section}>
          <Switch>
            <Route path={routes.ADD_EXAMINER} exact component={AddExaminers} />
            <Route path={routes.EDIT_EXAMINER} exact component={AddExaminers}/>
            <Route path={routes.EXAMINERS} exact component={Examiners} />
            <Route path={routes.SINGLE_EXAMINER_VIEW} exact component={SingleExaminer} />
            <Route path={routes.SESSIONS} exact component={Sessions} />
            <Route path={routes.ADD_SESSION} exact component={AddSessions} />
            <Route path={routes.EDIT_SESSION} exact component={AddSessions}/>
          </Switch>
        </section>
      </Wrapper>
  )
}

export const renderLoginPage = () => {
  return (
    <section className={classes.Section}>
      <Route path={routes.LOGIN_PAGE} exact component={Auth} />
    </section>
  )
}