import React, { useState, useEffect } from "react";
import "../styles.css"; // Import the CSS file
import ApiDetails from "./ApiDetails";

function Jay() {
  const [apiEntry, setApiEntry] = useState(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchButtonColor, setSearchButtonColor] = useState("");

  const clearData = () => {
    setApiEntry(null);
    setIsHighlighted(false);
    setButtonColor("");
    setSearchTerm("");
    setFilteredCategories([]);
    setSearchButtonColor("");
  };

  const fetchRandomData = () => {
    setIsHighlighted(false);
    setButtonColor("");
    setSearchButtonColor("");

    fetch("https://api.publicapis.org/random")
      .then((response) => response.json())
      .then((data) => {
        setApiEntry(data.entries[0]);
      });
  };

  const fetchByCategory = (category) => {
    setIsHighlighted(false);
    setButtonColor("");
    setSearchButtonColor("");

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

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = apiCategories.filter((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
      setSearchButtonColor("button-clicked");
    } else {
      setFilteredCategories([]);
      setSearchButtonColor("");
    }
  };

  return (
    <div className="title">
      <h1>Random API Entry</h1>
      <p>
        <b>API Content:</b>{" "}
        <span className={isHighlighted ? "button-highlighted" : ""}>
          {apiEntry && apiEntry.API}
        </span>
      </p>
      <p>
        <b>Category:</b>{" "}
        <span>{apiEntry ? apiEntry.Category : "No category"}</span>
      </p>
      <i>
        <p>
          <b>Description:</b>{" "}
          <span>{apiEntry ? apiEntry.Description : "No description"}</span>
        </p>
      </i>
      <br />
      <button
        className={`custom-button ${buttonColor}`}
        onClick={() => {
          setIsHighlighted(false);
          setButtonColor("button-clicked");
          fetchRandomData();
        }}
      >
        Get Random API
      </button>
      <br />
      <input
        type="text"
        placeholder="Search API Categories"
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button
        className={`search-button custom-button ${searchButtonColor}`}
        onClick={handleSearch}
      >
        Search Categories
      </button>
      <button className="custom-button" onClick={clearData}>
        Clear Data
      </button>
      <div className="button-container">
        {searchTerm
          ? filteredCategories.map((category, index) => (
              <button
                className="custom-button"
                key={index}
                onClick={() => {
                  setIsHighlighted(false);
                  setButtonColor("");
                  fetchByCategory(category);
                }}
              >
                {category}
              </button>
            ))
          : apiCategories.map((category, index) => (
              <button
                className="custom-button"
                key={index}
                onClick={() => {
                  setIsHighlighted(false);
                  setButtonColor("");
                  fetchByCategory(category);
                }}
              >
                {category}
              </button>
            ))}
      </div>
    </div>
  );
}

export default Jay;
