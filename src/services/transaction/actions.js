import { fetchTransactions } from 'services/api/transaction';

export const TRANSACTION_REQUEST = 'TRANSACTION_REQUEST';
export const TRANSACTION_RESPONSE = 'TRANSACTION_RESPONSE';

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
