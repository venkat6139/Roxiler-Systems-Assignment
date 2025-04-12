import React from 'react';

function SummaryCards({ summary }) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>Total Users: {summary.users}</div>
      <div>Total Stores: {summary.stores}</div>
      <div>Total Ratings: {summary.ratings}</div>
    </div>
  );
}

export default SummaryCards;
