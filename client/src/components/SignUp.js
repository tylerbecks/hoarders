import React from 'react';
import {Button} from 'react-bootstrap';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <Button onClick={this.props.logIn} bsStyle="link"> Already have an account? </Button>
          <Button bsStyle="primary"> Sign Up </Button>
        </form>
      </div>
    )
  }
}