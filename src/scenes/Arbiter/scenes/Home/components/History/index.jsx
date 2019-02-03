import React from 'react';
import { connect } from 'react-redux';

const History = ({ history }) => {
  return (
    <div>
      {
        history.map(transaction => (
          <div>
            
          </div>
        ))
      }
    </div>
  );
}

const mapStateToProps = state => ({
  history: state.user.data.history,
}); 

export default connect(mapStateToProps)(History);
