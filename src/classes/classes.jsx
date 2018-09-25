import { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.message = this.message.bind(this);
    this.state = {
      isConfirming: false
     }
  }

  message = () => {
    return 'hello'
  }
}

export default MyComponent;
console.log(MyComponent.message)
