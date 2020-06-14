import React from "react";

const Meme = ({ meme, handleClick, solo = false }) => {
  let classname = solo ? "solo-meme" : "meme";

  return (
    <div className={classname}>
      <img src={meme.url} alt="meme" onClick={handleClick} />
      <p>{meme.name}</p>
    </div>
  );
};

export default Meme;
