import React from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/searchBar";
import SearchResults from "./Components/SearchResult/searchResult";
import Playlist from "./Components/PlayList/playList";

const App = () => {
  return (
    <div>
      <h1>
        Ja<span className="title">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
};

export default App;
