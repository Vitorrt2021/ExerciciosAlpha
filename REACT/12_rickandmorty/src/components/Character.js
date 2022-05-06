function Character({ data, key }) {
  return (
    <div key={key}>
      {data.status != "Alive" ? (
        <h1 className={`Status_${data.status}`}>{data.status}</h1>
      ) : (
        ""
      )}
      <div className={`card ` + data.status}>
        <img src={data.image} />
        <h3>Name:{data.name}</h3>
        <h3>Specie:{data.species}</h3>
        <h3>Status:{data.status}</h3>
      </div>
    </div>
  );
}

export default Character;
