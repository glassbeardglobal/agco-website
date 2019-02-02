import React, { Component } from 'react';
import { Form, Text } from 'informed';

import { uploadImage } from 'services/api/upload';

import Batch from './Batch';
import './styles.scss';

const validate = value => {
  return !value || value.length === 0 ? 'Field must not be empty' : null;
}

class Upload extends Component {
  constructor() {
    super();

    this.state = {
      fetching: false,
      error: null,
    }
  }

  handleSubmit = () => {
    const img = document.querySelector("#image");
    this.formApi.submitForm();
    const formState = this.formApi.getState();
    if (formState.invalid || formState.pristine) {
      console.log(formState.errors);
      return;
    }

    this.setState({ fetching: true, error: null });
    uploadImage(formState.values, img.files[0])
      .then(() => this.setState({ fetching: false }))
      .catch(err => this.setState({ fetching: false, error: err }));
  }

  setFormApi = (formApi) => { this.formApi = formApi; }

  render() {
    const { fetching, error } = this.state;

    let body = null;
    if (fetching) {
      body = <p>Submitting...</p>
    } else if (error) {
      body = <p>{ error }</p>;
    } else {
      body = (
        <Form id="upload-form" getApi={this.setFormApi}>
          <label htmlFor="title">Title:</label>
          <Text field="title" id="title" initialValue="" />

          <label htmlFor="location">Location:</label>
          <Text field="location" id="location" initialValue="" />

          <label htmlFor="description">Year:</label>
          <Text field="description" id="description" initialValue="" />

          <label htmlFor="image">Image:</label>
          <Text field="image" id="image" type="file" validate={validate} />

          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </Form>
      );
    }

    return (
      <div className="upload">
        <div className="pane">
          <h1>Upload a Photo</h1>
          { body }
        </div>
        <div className="pane">
          <h1>Upload Batch</h1>
          <Batch />
        </div>
      </div>
    );
  }
}

export default Upload;
