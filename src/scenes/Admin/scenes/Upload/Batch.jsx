import React, { Component } from 'react';

import { uploadImage } from 'services/api/upload';

import './styles.scss';

const BATCH_STATE = {
  COMPLETED: 0,
  UPLOADING: 1,
  WAITING: 2,
}

const METADATA_STUB = {
  title: '',
  location: '',
  description: '',
};

class Batch extends Component {
  constructor() {
    super();

    this.state = {
      uploading: false,
      count: 0,
      error: false,
    }

    this.inputRef = React.createRef();
    this.fileStates = [];
    this.files = [];
  }

  handleSubmit = () => {
    const { files } = this.inputRef.current;
    this.files = files;
    this.fileStates = [];

    this.setState({ uploading: true, count: 0, error: false });

    for (let i = 0; i < files.length; i++) {
      this.fileStates.push(BATCH_STATE.WAITING);
    }

    const threads = [];
    for (let i = 0; i < 5; i++) {
      threads.push(this.queueUpload());
    }

    Promise.all(threads).then(() => {
      setTimeout(() => this.setState({ count: 0, uploading: false }), 3000);
    }).catch(() => this.setState({ uploading: false, error: true }));
  }

  queueUpload = () => {
    const next = this.fileStates.indexOf(BATCH_STATE.WAITING);
    if (next === -1) { return; }
    this.fileStates[next] = BATCH_STATE.UPLOADING;

    return uploadImage(METADATA_STUB, this.files[next])
      .then(() => {
        this.setState(prevState => ({
          count: prevState.count + 1,
        }));
        return this.queueUpload();
      })
      .catch(() => this.setState({ uploading: false, count: 0 }));
  }

  render() {
    const { uploading, count, error } = this.state;

    let pct = count / Math.max(1, this.files.length) * 100;

    if (uploading) { pct = Math.max(pct, 2); }

    return (
      <div className="batch-upload">
        <input
          type="file"
          id="photos" name="photos"
          accept="image/png, image/jpeg"
          multiple
          ref={this.inputRef}
        />

        <button type="submit" onClick={this.handleSubmit}>Submit</button>

        <div className="progress">
          <div className="loader" style={{ width: `${pct}%`}} />
        </div>

        { error &&
          <p>Error occured</p>
        }
      </div>
    );
  }
}

export default Batch;
