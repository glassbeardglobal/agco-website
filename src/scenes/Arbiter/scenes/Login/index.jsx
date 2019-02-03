import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import { login } from 'services/user/actions';

import './styles.scss';

class Login extends Component {
  submit = (values) => {
    this.props.login(values.email, values.password);
  }

  render() {
    return (
      <div className="login">
        <h1>The <span>Harvest</span></h1>
        <div className="login-form">
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={this.submit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="farmer@gmail.com"
                />
                {errors.email && touched.email && errors.email}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                {errors.password && touched.password && errors.password}
                <button className="green" type="submit" disabled={isSubmitting}>
                  Log In
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(null, mapDispatchToProps)(Login);
