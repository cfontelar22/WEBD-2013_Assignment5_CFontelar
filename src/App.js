import React, { useState, useEffect } from "react";
import "../styles.css";

function Jay() {
  const [apiEntry, setApiEntry] = useState(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [buttonColor, setButtonColor] = useState("teal");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const clearData = () => {
    setApiEntry(null);
  };

  const fetchRandomData = () => {
    setIsHighlighted(false);
    setButtonColor("teal");

    fetch("https://api.publicapis.org/random")
      .then((response) => response.json())
      .then((data) => {
        setApiEntry(data.entries[0]);
      });
  };

  const fetchByCategory = (category) => {
    setIsHighlighted(false);
    setButtonColor("teal");

    fetch(`https://api.publicapis.org/random?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setApiEntry(data.entries[0]);
      });
  };

  useEffect(() => {
    fetchRandomData();
  }, []);

  const apiCategories = [
    "Business",
    "Science & Math",
    "Health",
    "Music",
    "Weather",
    "Technology",
    "Food & Drink",
    "Animals",
    "Sports & Fitness",
    "Books",
    "Games",
    "Movies"
  ];

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = apiCategories.filter((category) =>
      category.toLowerCase().includes(searchTerm)
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="title">
      <h1 style={{ color: "#333", fontSize: "24px" }}>Random API Entry</h1>
      <p>
        <b>API Content:</b>{" "}
        <span
          className={isHighlighted ? "button-highlighted" : ""}
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {apiEntry && apiEntry.API}
        </span>
      </p>
      <p>
        <b>Category:</b>{" "}
        <span style={{ fontSize: "16px" }}>
          {apiEntry ? apiEntry.Category : "No category"}
        </span>
      </p>
      <i>
        <p>
          <b>Description:</b>{" "}
          <span style={{ fontSize: "16px" }}>
            {apiEntry ? apiEntry.Description : "No description"}
          </span>
        </p>
      </i>
      <br />

      <input
        type="text"
        placeholder="Search API Categories"
        className="search-input"
        onChange={handleSearch}
        value={searchTerm}
      />

      <div className="button-container">
        <button className="clear-button" onClick={clearData}>
          Clear Data
        </button>
        {searchTerm
          ? filteredCategories.map((category, index) => (
              <button
                className="custom-button"
                key={index}
                onClick={() => fetchByCategory(category)}
              >
                {category}
              </button>
            ))
          : apiCategories.map((category, index) => (
              <button
                className="custom-button"
                key={index}
                onClick={() => fetchByCategory(category)}
              >
                {category}
              </button>
            ))}
      </div>
    </div>
  );
}

export default Jay;
