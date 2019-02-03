import React, { Component } from 'react';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import { toggleSelling } from 'services/api/items';
import { uploadTransaction } from 'services/api/transaction';
import { getItems } from 'services/item/actions';
import { getUsers } from 'services/otherUsers/actions';
import { getTransactions } from 'services/transaction/actions';
import { getUser } from 'services/user/actions';

class Info extends Component {
  onMarket = () => {
    const { data, getItems } = this.props;
    const { _id } = data;
    toggleSelling(_id, true)
      .then(x => getItems())
      .catch(err => console.log(err));
  }

  offMarket = () => {
    const { data, getItems } = this.props;
    const { _id } = data;
    toggleSelling(_id, false)
      .then(x => getItems())
      .catch(err => console.log(err));
  }

  onMarket = () => {
    const { data, userId } = this.props;
    const itemId = data._id;
    const price = data.price;
    const sellerId = data.userId;
    const buyerId = userId;

    uploadTransaction(itemId, buyerId, sellerId, price)
      .then(() => {
        getItems();
        getUsers();
        getTransactions();
        getUser(userId);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { data, onClose, disableButtons } = this.props;

    if (data === null) {
      return null;
    }

    const {
      name,
      manufacturer,
      compatibility,
      year,
      condition,
      price,
      description,
      forSale
    } = data;

    return (
      <div className={`sliding-info ${disableButtons ? 'no-buttons' : 'butt'}`}>
        <CloseIcon className="close" onClick={onClose} />
        <h5>{name}</h5>
        <div className="split">
          <table>
            <tbody>
              <tr>
                <td>Manufacturer:</td>
                <td>{manufacturer}</td>
              </tr>
              <tr>
                <td>Compatibility:</td>
                <td>{compatibility}</td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>{year}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td>Condition:</td>
                <td>{condition}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{price}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{description}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="split-mobile">
          <table>
            <tbody>
              <tr>
                <td>Manufacturer:</td>
                <td>{manufacturer}</td>
              </tr>
              <tr>
                <td>Compatibility:</td>
                <td>{compatibility}</td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>{year}</td>
              </tr>
              <tr>
                <td>Condition:</td>
                <td>{condition}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{price}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{description}</td>
              </tr>
            </tbody>
          </table>
        </div>

        { !disableButtons &&
          <div className="buttons">
            <Button variant="contained" color="primary" disabled={!!forSale} onClick={this.onMarket}>
              Mark For Sale
            </Button>
            <Button variant="contained" color="secondary" disabled={!forSale} onClick={this.offMarket}>
              Take Off Market
            </Button>
          </div>
        }

        { disableButtons &&
          <div className="buttons">
            <Button variant="contained" color="primary" onClick={this.onMarket}>
              Purchase
            </Button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.data._id,
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
