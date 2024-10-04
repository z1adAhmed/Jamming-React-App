import React from "react";
import "./playList.css";
import Tracklist from "../TrackList/trackList"; // To display tracks in the playlist

function Playlist() {
  return (
    <div className="Playlist">
      <input value="New-Playlist" />
      <Tracklist />
      <button className="Playlist-save">Save to Spotify</button>
    </div>
  );
}

export default Playlist;
