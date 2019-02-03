import { fetchTransactions, uploadTransaction } from 'services/api/transaction';

export const TRANSACTION_REQUEST = 'TRANSACTION_REQUEST';
export const TRANSACTION_RESPONSE = 'TRANSACTION_RESPONSE';
export const CREATE_REQUEST = 'CREATE_REQUEST';

function requestTransactions() {
  return {
    type: TRANSACTION_REQUEST,
  };
}

function receiveTransactions(data) {
  return {
    type: TRANSACTION_RESPONSE,
    data,
  };
}

export function getTransactions() {
  return dispatch => {
    dispatch(requestTransactions());
    fetchTransactions().then(data => dispatch(receiveTransactions(data)), () => dispatch(receiveTransactions(null)));
  };
}

export function createdTransaction(itemId, sellerId, buyerId, price) {
  return {
    type: CREATE_REQUEST,
    itemId,
    sellerId,
    buyerId,
    price,
  };
}

export function createTransaction(itemId, sellerId, buyerId, price) {
  return dispatch => {
    uploadTransaction(itemId, sellerId, buyerId).then(
      data => dispatch(createdTransaction(itemId, sellerId, buyerId, price)), () => console.log('Error creating transaction')
    );
  };
}
