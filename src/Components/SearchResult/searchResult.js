import React from "react";
import "./searchResult.css";
import Track from "../Track/track";
import Tracklist from "../TrackList/trackList"; // Assuming Tracklist will be used here

function SearchResults({ tracks, onAdd }) {
  return (
    <div>
      <h2>Results</h2>
      <div className="resultsBox">
        {tracks.map((track) => (
          <Track key={track.id} track={track} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
