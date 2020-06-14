import React from "react";

const Meme = (meme) => {
  console.log(meme.meme);
  return (
    <div className="meme">
      <img src={meme.meme.url} alt="meme" />
      <p>{meme.meme.name}</p>
    </div>
  );
};

export default Meme;
