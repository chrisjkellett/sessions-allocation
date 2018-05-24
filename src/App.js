import React, { Component } from 'react';
import Header from './containers/header/Header';
import Examiners from './containers/views/Examiners/Examiners';
import Wrapper from './containers/wrappers/Empty';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Examiners />
      </Wrapper>
    );
  }
}

export default App;
