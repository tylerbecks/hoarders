import React from 'react';
import { Button } from 'react-bootstrap';

export const Login = (props) => (
  <div>
    <form>
      <Button
        onClick={props.signUp}
        bsStyle="link"
      >
        Don't have an account?
      </Button>
      <Button
        onClick={props.validateUserLogin.bind(this)}
        bsStyle="primary"
      >
        Log In
      </Button>
    </form>
  </div>
);
