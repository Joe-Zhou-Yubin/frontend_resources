// App.jsx (pseudo-code for CSR)
import React, { useState, useEffect } from "react";

function App() {
  // Step 1: local state for data + loading/error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 2: fetch data after first render
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/products"); // call API
        if (!response.ok) throw new Error("Network error");
        const result = await response.json();
        setData(result); // update state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // empty dependency → run once after mount

  // Step 3: render UI based on state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
