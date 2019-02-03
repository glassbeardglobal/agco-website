import React from 'react';
import { connect } from 'react-redux';

const History = ({ transactions, usersDict }) => {
  return (
    <div>
      {
        transactions.map((transaction) => 
          <div key={transaction.time}>

          </div>
        )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  transactions: state.user.data.transactions,
  userDict: state.otherUsers.data.byId,
  itemDict: state.item.data.byId,
}); 

export default connect(mapStateToProps)(History);
