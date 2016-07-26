import React from 'react';
import { Button } from 'react-bootstrap';

export const SignUp = (props) => (
  <div>
    <form>
      <Button
        onClick={props.logIn}
        bsStyle="link"
      > 
        Already have an account?
      </Button>
      <Button
        onClick={props.validateUserSignup.bind(this)}
        bsStyle="primary"
      >
        Sign Up
      </Button>
    </form>
  </div>
);

