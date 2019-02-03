import React, { Component } from 'react';
import { connect } from 'react-redux';
import PurchaseArrow from 'assets/left-arrow-green.svg';
import SaleArrow from 'assets/left-arrow-red.svg';

import './styles.scss';

class History extends Component {
  render() {
    const { transactionsP, userDictP, itemDictP, transactionDictP, userIdP } = this.props;

    if (!(transactionsP && userDictP && itemDictP && transactionDictP && userIdP)) {
      return null;
    }

    const transactions = transactionsP.transactions;
    const transactionDict = transactionDictP.byId;
    const userDict = userDictP.byId;
    const itemDict = itemDictP.byId;
    const userId = userIdP._id;

    if (!transactions || transactions.length === 0) {
      return (
        <div className="no-transactions">
          <span>No recorded transactions</span>
        </div>
      );
    }
    return (
      <div>
        {
          transactions.map(transactionId => {
            const cur = transactionDict[transactionId];
            const date = new Date(cur.time);
            const datestring = `${date.getMonth() + 1}/${date.getDate()}`;
            let isBuyer = false;
            let otherUserId = cur.buyer;
            if (cur.buyer === userId) {
              isBuyer = true;
              otherUserId = cur.seller;
            }
            const otherUser = userDict[otherUserId];
            if (!otherUser) {
              return null;
            }
            const item = itemDict[cur.item];

            return (
              <div key={transactionId} className="transaction-el">
                <div className="left-data">
                  <span className="date">{datestring}</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <img
                  src={ isBuyer ? PurchaseArrow : SaleArrow }
                  className={ isBuyer ? 'purchase-arrow' : 'sale-arrow'}
                  alt={ isBuyer ? "Purchase arrow" : "Sale arrow"}
                />
                <span>{otherUser.username}</span>
                <span className="price">{`$${cur.price}`}</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactionsP: state.user.data,
  transactionDictP: state.transaction.data,
  userDictP: state.otherUsers.data,
  itemDictP: state.item.data,
  userIdP: state.user.data,
}); 

export default connect(mapStateToProps)(History);
