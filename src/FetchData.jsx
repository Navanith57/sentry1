import React, { useState } from "react";
import api from "./api";

const FetchData = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/some-endpoint");
      setData(response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default FetchData;
