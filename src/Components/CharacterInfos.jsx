import { useState, useEffect } from "react";
import CharacterEpisode from "./CharacterEpisode";
import Loading from "./Loading";

export default function CharacterInfos({
  allCharacters,
  isOpen,
  id,
  episodes,
}) {
  const a = allCharacters.slice(0, 5).filter((char) => char.id === id);
  const [episodeData, setEpisodeData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    const getEpisodes = async () => {
      if (episodes) {
        try {
          setLocalLoading(true);
          const episodeData = await Promise.all(
            episodes.map(async (episode) => {
              const response = await fetch(episode);
              const data = await response.json();
              return data;
            })
          );
          setEpisodeData(episodeData);
          setInitialData(episodeData);
        } catch (error) {
          console.error("Error fetching episodes:", error);
        } finally {
          setLocalLoading(false); 
        }
      }
    };
    getEpisodes();
  }, [episodes]);

  function handleClick() {
    if (isSorted) {
      setEpisodeData(initialData);
      setIsSorted(false);
    } else {
      const sortedEpisodes = [...episodeData].sort(
        (a, b) =>
          new Date(b.air_date).getTime() - new Date(a.air_date).getTime()
      );
      setEpisodeData(sortedEpisodes);
      setIsSorted(true);
    }
  }

  return (
    <>
      {isOpen && a[0] ? (
        <div
          style={{
            flex: "1 1 0%",
            color: "var(--slate-300)",
          }}
        >
          <div className="character-detail">
            <img
              src={a[0].image}
              alt={a[0].name}
              className="character-detail__img"
            />
            <div className="character-detail__info">
              <h3 className="name">
                <span>👨</span>
                <span>&nbsp;{a[0].name}</span>
              </h3>
              <div className="info">
                <span className="status"></span>
                <span>&nbsp;{a[0].status}</span>
                <span> - {a[0].species} </span>
              </div>
              <div className="location">
                <p>Last known location:</p>
                <span>{a[0].location.name}</span>
              </div>
              <div className="actions">
                <p>Already added to Favorites ✅</p>
              </div>
            </div>
          </div>
          <div className="character-episodes">
            <div className="title">
              <h2>List of Episodes</h2>
              <button onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="icon"
                  style={{ rotate: "0deg" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <ul>
              {localLoading ? (
                <Loading />
              ) : episodeData.length > 0 ? (
                episodeData.map((episode, index) => (
                  <CharacterEpisode
                    index={index}
                    key={episode.id}
                    episode={episode}
                  />
                ))
              ) : (
                <p>No episodes available.</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div
          style={{
            flex: "1 1 0%",
            color: "var(--slate-300)",
          }}
        >
          <p>Please select a character</p>
        </div>
      )}
    </>
  );
}
