import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, Alert, Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import * as actions from "../actions";
import CustomInput from "./CustomInput";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  redirect() {
    if (this.props.flight.hasOwnProperty("_id")) {
      this.props.history.push("/book");
    } else this.props.history.push("/");
  }

  handleSignIn = () => {
    this.props.history.push("/signin");
  };

  async onSubmit(formData) {
    console.log(formData);
    const res = await this.props.validateSignUp(formData);
    console.log(res);
    if (res) {
      await this.props.signUp(formData);
    }
    if (!this.props.errorMessage) {
      this.redirect();
    }
  }

  async responseFacebook(response) {
    console.log(response);
    console.log(this.props.flight);
    await this.props.oauthFacebook(response.accessToken);
    if (!this.props.errorMessage) {
      this.redirect();
    }
  }

  async responseGoogle(response) {
    console.log(response);
    await this.props.oauthGoogle(response.accessToken);
    if (!this.props.errorMessage) {
      this.redirect();
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row" style={{ margin:"-105",width:'100%',display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',backgroundImage: "url(" + "https://images.alphacoders.com/100/1005214.jpg" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
      >
        <div className="col" style={{padding:120,height:'90vh',
      opacity: .7}}>
        
          <Card style={{ width: '50rem' }}>
            <Card.Header>Create an account</Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    label="Email address"
                    placeholder="Enter email"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                <fieldset>
                  <Field
                    name="password1"
                    type="password"
                    id="password1"
                    label="Password"
                    placeholder="Password"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                <fieldset>
                  <Field
                    name="password2"
                    type="password"
                    id="password2"
                    label="Confirm Password"
                    placeholder="Password"
                    required
                    component={CustomInput}
                  ></Field>
                </fieldset>
                {this.props.errorMessage ? (
                  <Alert variant="danger">{this.props.errorMessage} </Alert>
                ) : null}
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </form>
            </Card.Body>
          </Card>
          <Card style={{ width: '50rem' }}>
            <Card.Body>
              <Card.Text>Already have an account?</Card.Text>
              <Button variant="link" onClick={this.handleSignIn}>
                Sign in
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    flight: state.flight.flight,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
