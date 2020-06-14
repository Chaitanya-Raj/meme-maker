import React, { useState, useEffect } from "react";
import Axios from "axios";
import Meme from "./components/Meme";
import "./reset.css";
import "./App.css";

function App() {
  const [templates, SetTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    Axios.get("https://api.imgflip.com/get_memes", { crossDomain: true }).then(
      (response) => {
        SetTemplates(response.data.data.memes);
      }
    );
  }, []);

  const templateView = () => {
    if (templates) {
      return templates.map((template) => (
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (template) {
    return (
      <div className="container solo-container">
        {createView()}
        <form onSubmit={handleSubmit}>
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <button type="submit">create</button>
        </form>
      </div>
    );
  }
  return <div className="container">{templateView()}</div>;
}

export default App;
