import { useState, useEffect } from "react";
import axios from "axios";

const UseGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      setData(response?.data?.cities?.rows);
      setLoading(false);
    }
    fetchData();
  }, []);
  return { data, loading };
};

export default UseGet;
