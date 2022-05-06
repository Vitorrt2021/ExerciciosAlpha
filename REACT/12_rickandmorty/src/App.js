import "./App.css";
import { useState } from "react";
import Character from "./components/Character";

function App() {
  const [episode, setEpisode] = useState();
  const [submited, setSubmited] = useState(false);
  const [characterElements, setCharacterElements] = useState([]);

  function handleChange(e) {
    setEpisode(e.target.value);
  }

  async function getCharacters(ep) {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${ep}`);
    const episode_data = await res.json();
    return episode_data.characters;
  }

  async function renderCharacter(character) {
    const res = await fetch(character);
    const characters_data = await res.json();
    return characters_data;
  }

  async function renderAll() {
    const res = [];
    const characters = await getCharacters(episode);
    for (let i = 0; i < characters.length - 1; i++) {
      const ele = await renderCharacter(characters[i]);
      res.push(ele);
    }
    return res;
  }
  async function submit(e) {
    e.preventDefault();
    setCharacterElements(await renderAll());
    console.log(characterElements);
    setSubmited(true);
  }
  return (
    <div className="App">
        {submited ? (
          <div className="content">
              {characterElements.map((e) => {
                return <Character key={Math.random()} data={e} />;
              })}
          </div>
        ) : (
          <form onSubmit={submit}>
            <label>Episodio</label>
            <input onChange={handleChange} type="number" />
            <input type="submit" />
          </form>
        )}
    </div>
  );
}

export default App;
