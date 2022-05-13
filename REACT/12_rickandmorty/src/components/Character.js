import styled from "styled-components";

const CharacterCard = styled.div`
  h3 {
    font-size: 1em;
    font-weight: 500;
  }
  .card {
    margin: 10px;
    border: solid black 2px;
  }
  .Alive {
    background-color: rgba(32, 232, 32, 0.813);
  }
  .Dead {
    background-color: rgb(230, 80, 80);
    filter: opacity(30%);
  }
  .Status_Dead {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    margin-left: 10px;
    background: black;
    width: 305px;
    height: 70px;
    color: red;
  }
  .Status_unknown {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
    margin-left: 10px;
    background: black;
    width: 305px;
    height: 70px;
    color: white;
  }
  .unknown {
    background-color: rgb(158, 157, 157);
    filter: opacity(30%);
  }
`;

function Character({ data, key }) {
  return (
    <CharacterCard key={key}>
      {data.status != "Alive" ? (
        <h1 className={`Status_${data.status}`}>{data.status}</h1>
      ) : (
        ""
      )}
      <div className={`card ` + data.status}>
        <img src={data.image} />
        <h3>
          <strong>Name:</strong> {data.name}
        </h3>
        <h3>
          <strong>Specie:</strong> {data.species}
        </h3>
        <h3>
          <strong>Status:</strong> {data.status}
        </h3>
      </div>
    </CharacterCard>
  );
}

export default Character;
