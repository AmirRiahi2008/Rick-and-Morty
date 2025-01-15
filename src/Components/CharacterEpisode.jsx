export default function CharacterEpisode({ episode, index }) {
  return (
    <li>
      <div>
        {index < 10 ? "0" + (index + 1) : index + 1}-{episode.episode} :{" "}
        <strong>{episode.name}</strong>
      </div>
      <div className="badge badge--secondary">{episode.air_date}</div>
    </li>
  );
}
