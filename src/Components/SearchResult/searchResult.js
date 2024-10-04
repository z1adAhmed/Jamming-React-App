import React from "react";
import "./searchResult.css";
import Tracklist from "../TrackList/trackList"; // Assuming Tracklist will be used here

function SearchResults() {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist />
    </div>
  );
}

export default SearchResults;
