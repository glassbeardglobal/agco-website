import React, { Component } from 'react';
import { Form, Text } from 'informed';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      updating: false,
      deleting: false,
    };
  }

  setFormApi = (formApi) => { this.formApi = formApi; }

  handleSubmit = () => {
    const { username, password } = this.formApi.getState().values;
    this.props.login(username, password);
  }

  render() {
    return (
      <div className="login container">
        <h1>Admin Login</h1>

        <Form id="edit-form" getApi={this.setFormApi}>
          <Text
            field="username"
            id="username"
            initialValue=""
          />
          <Text
            field="password"
            id="password"
            initialValue=""
            type="password"
          />

          <button className="green" type="submit" onClick={this.handleSubmit}>Submit</button>
        </Form>
      </div>
    );
  }
}

export default Login;
