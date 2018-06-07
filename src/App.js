import React, { Component } from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './containers/header/Header';
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
            <Route path='/add-examiner' exact component={AddExaminers} />
            <Route path="/examiners/edit/:id" exact component={AddExaminers}/>
            <Route path='/:name' exact component={SingleExaminer} />
            <Route path='/' component={Examiners} />
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
