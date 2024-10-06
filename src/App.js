import React, { useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/searchBar";
import SearchResults from "./Components/SearchResult/searchResult";
import Playlist from "./Components/PlayList/playList";

function App() {
  const [tracks, setTracks] = useState([]);

  const [playlist, setPlaylist] = useState([]); // Initialize an empty playlist
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const client_id = "3ef0d527af414a98b07f2692c23974fb"; // Your client ID
  const client_secret = "1199bb452c5c49d1a09f8a1f33175a43"; // Your client secret
  const redirect_uri = "http://localhost:3000";

  // Function to get the access token

  const searchSpotify = async (searchTerm) => {
    const getAccessToken = async () => {
      const authOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`, // Encode client ID and secret
        },
        body: "grant_type=client_credentials", // Required for client_credentials flow
      };

      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch access token");
      }

      const data = await response.json();
      return data.access_token; // Return the access token
    };
    try {
      // Get the access token
      const accessToken = await getAccessToken();

      // Now make the request to search for tracks
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
          searchTerm
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the obtained access token
            "Content-Type": "application/json",
          },
        }
      );

      // Check the response status
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Map the results to an array of track objects
      const trackList = data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name, // Assuming you want the first artist
        album: track.album.name,
        uri: track.uri,
      }));

      setTracks(trackList); // Update your state with the search results
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const addTrackToPlaylist = (track) => {
    if (playlist.find((savedTrack) => savedTrack.id === track.id)) {
      return; // If the track is found, exit the function and do nothing
    }
    setPlaylist((prevPlaylist) => [...prevPlaylist, track]); // Add track to the playlist
  };

  // Function to update the playlist name
  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  };

  const getUserId = async (accessToken) => {
    console.log("Access Token in getUserId:", accessToken);

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Capture error response text
      console.error("Failed to get user ID:", errorText); // Log the detailed error
      throw new Error("Failed to get user ID");
    }

    const userData = await response.json();
    return userData.id; // Return the user's Spotify ID
  };

  const createPlaylist = async (
    userId,
    playlistName,
    playlistDescription,
    accessToken
  ) => {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription,
          public: false, // Set to true if you want the playlist to be public
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating playlist:", errorData); // Log the error response
      throw new Error("Failed to create playlist");
    }

    const playlistData = await response.json();
    return playlistData.id; // Return the newly created playlist ID
  };

  const addTracksToPlaylist = async (playlistId, trackURIs, accessToken) => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackURIs }), // The track URIs to add
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add tracks to playlist");
    }
  };

  const savePlaylist = async (playlistName, playlistDescription, trackURIs) => {
    const getAccessToken = () => {
      // Check if the token is already in the URL
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.slice(1));
        const accessToken = params.get("access_token");

        if (accessToken) {
          // Clear the token from the URL
          window.history.pushState(
            "",
            document.title,
            window.location.pathname
          );
          return accessToken;
        }
      }

      // If no access token is found, redirect to Spotify for authorization
      const scopes =
        "user-read-private user-read-email playlist-modify-public playlist-modify-private"; // Required scopes
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${encodeURIComponent(
        redirect_uri
      )}&scope=${encodeURIComponent(scopes)}`;

      window.location.href = authUrl; // Redirect user for authentication
      return null; // Return null since the user is being redirected
    };
    const accessToken = await getAccessToken();
    try {
      const userId = await getUserId(accessToken); // Get the user's Spotify ID
      const playlistId = await createPlaylist(
        userId,
        playlistName,
        playlistDescription,
        accessToken
      ); // Create a new playlist
      await addTracksToPlaylist(playlistId, trackURIs, accessToken); // Add tracks to the new playlist
      alert("Playlist saved successfully!");
    } catch (error) {
      console.error("Error saving playlist:", error);
      alert("Failed to save the playlist. Please try again.");
    }
  };

  // Example usage:
  // savePlaylist("My Jammming Playlist", "A playlist created from the Jammming app", trackURIs);

  return (
    <div className="App">
      <h1>
        Ja<span className="title">mmm</span>ing
      </h1>
      <SearchBar onSearch={searchSpotify} />
      <div className="results-playlist-container">
        <SearchResults tracks={tracks} onAdd={addTrackToPlaylist} />
        <Playlist
          name={playlistName}
          tracks={playlist}
          onNameChange={updatePlaylistName}
          setPlaylist={setPlaylist}
          savePlaylist={savePlaylist}
          setName={setPlaylistName}
        />
      </div>
    </div>
  );
}

export default App;
