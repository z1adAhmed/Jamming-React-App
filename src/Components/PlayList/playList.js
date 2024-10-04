import React, { useState } from "react";
import "./playList.css";
import Tracklist from "../TrackList/trackList"; // To display tracks in the playlist

function Playlist({ name, tracks, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false); // State to track if we are editing
  const [newName, setNewName] = useState(name); // State to hold the new playlist name

  const handleNameClick = () => {
    setIsEditing(true); // Set editing mode when the name is clicked
  };

  const handleChange = (event) => {
    setNewName(event.target.value); // Update the new name as the user types
  };

  const handleBlur = () => {
    setIsEditing(false); // Exit editing mode
    onNameChange(newName); // Update the playlist name in the parent component
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBlur(); // Save the name when the Enter key is pressed
    }
  };

  return (
    <div className="Playlist">
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={handleChange} // Call handleChange when the input changes
          onBlur={handleBlur} // Call handleBlur when the input loses focus
          onKeyDown={handleKeyDown} // Call handleBlur on Enter key press
          autoFocus // Automatically focus on the input when editing
        />
      ) : (
        <h2 onClick={handleNameClick}>{name}</h2> // Clickable name to enter editing mode
      )}
      <div>
        {tracks.map((track, index) => (
          <div key={index}>
            <h3>{track.name}</h3>
            <p>
              {track.artist} | {track.album}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
