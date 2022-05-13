import { useState } from "react";
import styled from "styled-components";
import Character from "../Character";

const FormEp = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: gainsboro;
  border: solid 2px gray;

  width: 300px;
  height: 300px;
  margin-top: 100px;

  font-size: 1.7em;

  input[type="number"] {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
  }
  input[type="submit"] {
    border: none;
    width: 100px;
    height: 40px;
    font-size: 0.8em;
    background-color: blueviolet;
    color: white;
    cursor: pointer;
  }
  input[type="submit"]:hover {
    background-color: rgb(90, 19, 157);
  }
`;

function Rick() {
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
        <FormEp onSubmit={submit}>
          <label>Episodio</label>
          <input onChange={handleChange} type="number" />
          <input type="submit" />
        </FormEp>
      )}
    </div>
  );
}

export default Rick;
