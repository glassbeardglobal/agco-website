import React, { Component } from 'react';
import { Formik } from 'formik';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import './styles.scss';

class ItemUpload extends Component {
  constructor() {
    super();

    this.state = {
      imageUploaded: true,
    }
  }

  imageSet = () => {
    this.setState({ imageUploaded: true });
  }

  render() {
    const { imageUploaded } = this.state;
    console.log(imageUploaded);

    return (
      <div className="container upload">
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={this.submit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                { !imageUploaded &&
                  <Fab color="primary" aria-label="Add">
                    <label htmlFor="image-upload" ref={this.imgButtonRef}>
                      <CameraAltIcon />
                    </label>

                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      capture="camera"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                        this.imageSet();
                      }}
                    />
                  </Fab>
                }
                { imageUploaded &&
                  <div className="field-1">
                    <TextField
                      type="text"
                      label="Item Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="field"
                    />
                    <TextField
                      type="text"
                      label="Manufacturer"
                      name="manufacturer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.manufacturer}
                      className="field"
                    />
                    <TextField
                      type="text"
                      label="Compatibility"
                      name="compatibility"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.compatibility}
                      className="field"
                    />
                    <TextField
                      type="text"
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      multiline={true}
                      rows={3}
                      rowsMax={5}
                      className="field ta"
                    />
                    <div className="field" style={{ marginTop: 14 }}>
                      <InputLabel htmlFor="condition">Condition</InputLabel>
                      <Select
                        value={values.condition}
                        onChange={handleChange}
                        inputProps={{
                          name: 'condition',
                          id: 'condition',
                        }}
                        className="sel"
                      >
                        <MenuItem value={'New'}>New</MenuItem>
                        <MenuItem value={'Used - Like New'}>Used - Like New</MenuItem>
                        <MenuItem value={'Used - Refurbished'}>Used - Refurbished</MenuItem>
                        <MenuItem value={'Used - Well Worn'}>Used - Well Worn</MenuItem>
                        <MenuItem value={'Used - Functional'}>Used - Functional</MenuItem>
                      </Select>
                    </div>
                    <TextField
                      type="number"
                      label="Year"
                      name="year"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.year}
                      className="field"
                    />
                    <TextField
                      type="text"
                      label="Price"
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      className="field"
                    />
                  </div>
                }
              </form>
            )}
          </Formik>
      </div>
    );
  }
}

export default ItemUpload;
