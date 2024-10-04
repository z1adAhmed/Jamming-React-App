import React from "react";
import "./searchBar.css";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" />
      <button className="SearchButton">Search</button>
    </div>
  );
}

export default SearchBar;
