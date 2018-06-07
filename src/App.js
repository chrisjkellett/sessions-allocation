import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './containers/header/Header';
import Examiners from './containers/views/Examiners/Examiners';
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
          <Route path='/' exact component={Examiners} />
          <Route path='/add-examiner' exact component={AddExaminers} />
          <Route path="/examiners/edit/:id" exact component={AddExaminers}/>
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
