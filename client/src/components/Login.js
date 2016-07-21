import React from 'react';
import {Button} from 'react-bootstrap';

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <Button 
            onClick={this.props.signUp}
            bsStyle="link"> Don't have an account? 
          </Button>
          <Button bsStyle="primary"> Log In </Button>
        </form>
      </div>
    )
  }
}