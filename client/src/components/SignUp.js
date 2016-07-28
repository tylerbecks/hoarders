import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

export const SignUp = (props) => (
  <Grid>
    <Row>
      <Col xs={7} sm={5} md={4} className="authComponent">
        <h1 className="welcome">Join the Club</h1>
      </Col>
    </Row>

    <Form horizontal>
      <FormGroup>
        <Col xs={7} sm={5} md={4} className="authComponent">
          <FormControl
            onChange={props.userChange}
            value={props.usernameText}
            type="text"
            placeholder="Username"
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col xs={7} sm={5} md={4} className="authComponent">
          <FormControl
            onChange={props.passwordChange}
            value={props.passwordText}
            type="password"
            placeholder="Password"
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col xs={7} sm={5} md={4} className="authComponent">
          <Button
            onClick={props.validateUserSignup.bind(this)}
            type="submit"
            bsStyle="primary"
            block
          >Sign Up
          </Button>
          <br />
          <span className="signing">Already have an account?
            <span className="clickable" onClick={props.logIn}> Log in </span>
          </span>
        </Col>
      </FormGroup>
    </Form>
  </Grid>
);
