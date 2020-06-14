import React, { useState, useEffect } from "react";
import Axios from "axios";
import Meme from "./components/Meme";
import "./reset.css";
import "./App.css";

function App() {
  const [memes, SetMemes] = useState([]);

  useEffect(() => {
    Axios.get("https://api.imgflip.com/get_memes", { crossDomain: true }).then(
      (response) => {
        SetMemes(response.data.data.memes);
      }
    );
  }, []);

  const memelist = () => {
    if (memes) {
      return memes.map((meme) => <Meme key={meme.id} meme={meme} />);
    }
    return <div>waiting</div>;
  };

  return <div className="container">{memelist()}</div>;
}

export default App;
