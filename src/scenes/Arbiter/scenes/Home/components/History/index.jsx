import React from 'react';
import { connect } from 'react-redux';
import PurchaseArrow from 'assets/left-arrow-green.svg';
import SaleArrow from 'assets/left-arrow-red.svg';

import './styles.scss';

const History = ({ transactions, userDict, itemDict, transactionDict, userId }) => {
  if (transactions.length === 0) {
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
          const datestring = `${date.getDate()} / ${date.getMonth() + 1}`;
          let isBuyer = false;
          let otherUserId = cur.buyer;
          if (cur.buyer === userId) {
            isBuyer = true;
            otherUserId = cur.seller;
          }
          const otherUser = userDict[otherUserId];
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

const mapStateToProps = state => ({
  transactions: state.user.data.transactions,
  transactionDict: state.transaction.data.byId,
  userDict: state.otherUsers.data.byId,
  itemDict: state.item.data.byId,
  userId: state.user.data._id,
}); 

export default connect(mapStateToProps)(History);
