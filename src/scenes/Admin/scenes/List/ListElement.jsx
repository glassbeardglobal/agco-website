import React, { Component } from 'react';
import { Form, Text } from 'informed';

import loader from 'assets/loader.svg';
import { updateImageById } from 'services/api/image';

class ListElement extends Component {
  constructor() {
    super();

    this.state = {
      updating: false,
      deleting: false,
    };
  }

  setFormApi = (formApi) => { this.formApi = formApi; }

  handleSubmit = () => {
    const { photo } = this.props;
    this.setState({ updating: true });
    updateImageById(photo._id, this.formApi.getState().values)
      .then(() => setTimeout(() => this.setState({ updating: false }), 300))
      .catch(() => this.setState({ updating: false }));
  }

  handleDelete = () => {
    this.setState({ deleting: true });
  }

  render() {
    const { photo } = this.props;
    const { updating } = this.state;

    const small = photo.images[0];

    return (
      <div className="list-element">
        <div className="img-wrapper">
          <img src={small.url} alt="thumbnail" />
        </div>

        <Form id="edit-form" getApi={this.setFormApi}>
          <Text
            field="location"
            id="location"
            initialValue={photo.location}
            placeholder="Location"
          />
          <Text
            field="description"
            id="description"
            initialValue={photo.description}
            placeholder="Year"
          />

          <div className={`button-container ${updating ? 'loading' : 'ready'}`}>
            <button className="green" type="submit" onClick={this.handleSubmit}>Submit</button>
            <img src={loader} alt="Loading" />
          </div>
          {/* <div className={`button-container ${deleting ? 'loading' : 'ready'}`}>
            <button className="red" type="button" onClick={this.handleDelete}>Delete</button>
            <img src={loader} alt="Loading" />
          </div> */}
        </Form>
      </div>
    );
  }
}

export default ListElement;
