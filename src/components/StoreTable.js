import React from 'react';

function StoreTable({ stores }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {stores.map(store => (
          <tr key={store.id}>
            <td>{store.name}</td>
            <td>{store.email}</td>
            <td>{store.address}</td>
            <td>{store.averageRating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StoreTable;
