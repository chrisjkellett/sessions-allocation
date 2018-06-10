import React, { Component } from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './containers/header/Header';
import Auth from './containers/forms/Auth/Auth';
import Examiners from './containers/views/Examiners/Examiners';
import SingleExaminer from './containers/views/SingleExaminer/SingleExaminer';
import AddExaminers from './containers/forms/Examiners/Examiners';
import Wrapper from './containers/wrappers/Empty';
import * as actions from './store/actions/examiners';

class App extends Component {
  componentDidMount(){
    this.props.loadExaminers();
  }

  render() {
    return (
      <Wrapper>
        <Header />
          <Switch>
            <Route path='/' exact component={Auth} />
            <Route path='/examiners/add' exact component={AddExaminers} />
            <Route path="/examiners/edit/:id" exact component={AddExaminers}/>
            <Route path='/examiners' exact component={Examiners} />
            <Route path='/examiners/:name' exact component={SingleExaminer} />
          </Switch>
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
