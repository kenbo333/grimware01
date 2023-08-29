import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);

  //   useEffect(() => {
  //     axios.get('https://api.example.com/data')
  //         .then(response => {
  //             setData(response.data);
  //             setLoading(false);
  //         })
  //         .catch(error => {
  //             setError(error);
  //             setLoading(false);
  //         });
  // }, []);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/ditto"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
