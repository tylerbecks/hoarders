import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

export const Login = (props) => (
  <Grid className="LoginContainer">
    <Row>
      <Col xs={7} sm={7} md={7} className="authComponent">
        <h1 className="welcome">Welcome Back</h1>
      </Col>
    </Row>

    <Form horizontal>
      <FormGroup>
        <Col xs={7} sm={7} md={7} className="authComponent">
          <FormControl
            onChange={props.userChange}
            value={props.usernameText}
            type="text"
            placeholder="Username"
            className="transparent"
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col xs={7} sm={7} md={7} className="authComponent">
          <FormControl
            onChange={props.passwordChange}
            value={props.passwordText}
            type="password"
            placeholder="Password"
            className="transparent"
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col xs={7} sm={7} md={7} className="authComponent">
          <Button
            onClick={props.validateUserLogin.bind(this)}
            type="submit"
            bsStyle="primary"
            block
          >Sign in
          </Button>
          <br />
          <div className="signing">Don't have an account yet?
            <span className="clickable" onClick={props.signUp}> Create one </span>
          </div>
        </Col>
      </FormGroup>
    </Form>
  </Grid>
);
