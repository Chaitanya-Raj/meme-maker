import React, { useState, useEffect } from "react";
import Axios from "axios";
import Meme from "./components/Meme";
import "./reset.css";
import "./App.css";

function App() {
  const [templates, SetTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [texts, setTexts] = useState([]);
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    Axios.get("https://api.imgflip.com/get_memes", { crossDomain: true }).then(
      (response) => {
        SetTemplates(response.data.data.memes);
      }
    );
  }, []);

  const templateView = () => {
    if (templates) {
      const filteredTemplates = templates.filter(
        (template) => template.box_count === 2
      );

      return filteredTemplates.map((template) => (
        <Meme
          key={template.id}
          meme={template}
          handleClick={() => {
            setTemplate(template);
          }}
        />
      ));
    }
  };

  const createView = () => {
    return <Meme key={template.id} meme={template} solo="true" />;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let params = {
      template_id: template.id,
      username: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD,
      text0: texts[0],
      text1: texts[1] || "",
    };
    const response = await Axios.post(
      `https://api.imgflip.com/caption_image?template_id=${params.template_id}&username=${params.username}&password=${params.password}&text0=${params.text0}&text1=${params.text1}`
    );
    console.log(response);
    setMeme(response.data.data.url);
  };

  const goBackHome = () => {
    setTemplate(null);
    setMeme(null);
  };

  if (meme) {
    return (
      <div>
        <img src={meme} alt="meme" />
        <button onClick={goBackHome}>Make another meme</button>
      </div>
    );
  }

  if (template) {
    return (
      <div className="container solo-container">
        {createView()}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={texts[0]}
            onChange={(e) => {
              let newText = texts;
              texts[0] = e.target.value;
              setTexts(newText);
            }}
          />
          <input
            type="text"
            value={texts[1]}
            onChange={(e) => {
              let newText = texts;
              texts[1] = e.target.value;
              setTexts(newText);
            }}
          />
          <button type="submit">create</button>
        </form>
        <button onClick={goBackHome}>Cancel</button>
      </div>
    );
  }
  return <div className="container">{templateView()}</div>;
}

export default App;
