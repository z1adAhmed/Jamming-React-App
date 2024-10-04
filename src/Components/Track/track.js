import React from "react";
import "./track.css";
function Track({ track, onAdd }) {
  const handleAddClick = () => {
    onAdd(track); // Call the onAdd function with the current track
  };

  return (
    <div className="tracks">
      <h3>{track.name}</h3>
      <p>
        {track.artist} | {track.album}
      </p>
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
}

export default Track;
