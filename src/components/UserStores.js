import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserStores.css";

function UserStores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const response = await axios.get("/api/stores");
    setStores(response.data);
  };

  const handleRatingChange = async (storeId, newRating) => {
    await axios.post(`/api/stores/${storeId}/rate`, { rating: newRating });
    fetchStores();
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-stores-container">
      <h2>Stores List</h2>
      <input
        type="text"
        placeholder="Search by store name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="stores-table">
        <div className="table-header">
          <div>Store Name</div>
          <div>Address</div>
          <div>Overall Rating</div>
          <div>Your Rating</div>
        </div>

        {filteredStores.map((store) => (
          <div className="table-row" key={store.id}>
            <div>{store.name}</div>
            <div>{store.address}</div>
            <div>{store.averageRating}</div>
            <div>
              <select
                value={store.userRating || ""}
                onChange={(e) =>
                  handleRatingChange(store.id, e.target.value)
                }
                className="rating-select"
              >
                <option value="">Rate</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserStores;
