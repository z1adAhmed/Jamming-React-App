import React from "react";
import "./trackList.css";
import Track from "../Track/track"; // To display individual tracks

function Tracklist() {
  return (
    <div className="Tracklist">
      {/* Render multiple Track components here */}
      <Track />
    </div>
  );
}

export default Tracklist;
