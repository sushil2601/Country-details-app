import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [result, setResult] = useState([]);
  const [searchId, setSearchId] = useState("");
  // const [filteredResult, setFilteredResult] = useState([]);

  const fetchData = async () => {
    const data = await fetch("https://api.sampleapis.com/countries/countries");
    const json = await data.json();
    setResult(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleClick = () => {
  //   if (searchId.trim() === "") {
  //     setFilteredResult(result); // show all if input is empty
  //   } else {
  //     const filtered = result.filter((item) =>
  //       item.name.toLowerCase().includes(searchId.toLowerCase())
  //     );
  //     setFilteredResult(filtered);
  //   }
  // };

  return (
    <div className="App">
      <h1>Displaying Country Details</h1>
      <hr />
      <input
        className="search-input"
        type="text"
        placeholder="Search by country name here ...."
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button className="search-button" onClick={() => handleClick()}>
        Search
      </button>
      <div className="card-container">
        {result
          .filter((item) =>
            searchId.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(searchId.toLowerCase())
          )
          .map((item) => (
            <div key={item.id} className="country-card">
              <img
                className="image"
                src={item.media.flag}
                alt="National Flag"
                height={200}
                width={200}
              />
              <h2>{item.name}</h2>
              <div className="detail-section">
                <p>
                  <strong>Capital:</strong>{" "}
                  <span className="detail-value">{item.capital}</span>
                </p>
                <p>
                  <strong>Currency:</strong>{" "}
                  <span className="detail-value">{item.currency}</span>
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  <span className="detail-value">{item.population}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
