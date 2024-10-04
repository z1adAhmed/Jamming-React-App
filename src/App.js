import React, { useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/searchBar";
import SearchResults from "./Components/SearchResult/searchResult";
import Playlist from "./Components/PlayList/playList";

function App() {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      name: "Song Title 1",
      artist: "Artist 1",
      album: "Album 1",
    },
    {
      id: 2,
      name: "Song Title 2",
      artist: "Artist 2",
      album: "Album 2",
    },
    {
      id: 3,
      name: "Song Title 3",
      artist: "Artist 3",
      album: "Album 3",
    },
  ]);

  const [playlist, setPlaylist] = useState([]); // Initialize an empty playlist
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
    // Implement your search logic here
  };

  const addTrackToPlaylist = (track) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, track]); // Add track to the playlist
  };

  // Function to update the playlist name
  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  };
  return (
    <div className="App">
      <h1>
        Ja<span className="title">mmm</span>ing
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="results-playlist-container">
        <SearchResults tracks={tracks} onAdd={addTrackToPlaylist} />
        <Playlist
          name={playlistName}
          tracks={playlist}
          onNameChange={updatePlaylistName}
        />
      </div>
    </div>
  );
}

export default App;
