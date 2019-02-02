import React, { Component } from 'react';
import { Form, Text } from 'informed';

import { uploadFeatured } from 'services/api/featured';
import './styles.scss';

const validate = value => {
  return !value || value.length === 0 ? 'Field must not be empty' : null;
}

class Featured extends Component {
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

    uploadFeatured(formState.values.id, img.files[0]);
  }

  setFormApi = (formApi) => { this.formApi = formApi; }

  render() {
    return (
      <div className="upload">
        <h1>Upload a Featured Image</h1>

        <Form id="upload-form" getApi={this.setFormApi}>
          <label htmlFor="id">ID of Main Image:</label>
          <Text field="id" id="id" initialValue="" validate={validate} />

          <label htmlFor="image">Image:</label>
          <Text field="image" id="image" type="file" validate={validate} />

          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </Form>
      </div>
    );
  }
}

export default Featured;
