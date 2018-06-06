import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './containers/header/Header';
import Examiners from './containers/views/Examiners/Examiners';
import AddExaminers from './containers/forms/Examiners/Examiners';
import Wrapper from './containers/wrappers/Empty';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Route path='/' exact component={Examiners} />
        <Route path='/examiners/add' exact component={AddExaminers} />
        <Route path="/examiners/edit/:id" exact component={AddExaminers}/>
      </Wrapper>
    );
  }
}

export default App;
