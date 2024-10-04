import React from "react";
import "./track.css";
function Track() {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>Track Name</h3>
        <p>Artist | Album</p>
      </div>
      <button className="Track-action">+</button>
      {/* This button will toggle between "+" and "-" depending on if the track is added or removed */}
    </div>
  );
}

export default Track;
