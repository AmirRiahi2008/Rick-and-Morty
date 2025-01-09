import { useState, useEffect } from "react";

import { searchCharacter } from "../Services/SearchCharacter.js";
import { getAllCharacters } from "../Services/GetAllCharacters.js";
import Loading from "./Loading";
import Toast from "./Toast";
import Header from "./Header";
import CharacterInfos from "./CharacterInfos";
import CharactersList from "./CharactersList";
import { getCharacter } from "../Services/GetCharacter.js";

export default function Main() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [charId, setCharId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [characterLoading, setCharacterLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [error, setError] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        const charactersData = await getAllCharacters();
        setAllCharacters(charactersData.results);
        setSearchResult(charactersData.results);
      } catch (err) {
        handleError("Error Getting All Characters", "error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, []);

  function handleError(message, type = "error", err = null) {
    setToast({ message, type });
    setError(true);
    if (err) console.error(err);
  }

  let lastSearch = null;
  async function handleSearch(value) {
    lastSearch = value;
    try {
      setLoading(true);
      if (!value.trim()) {
        setSearchResult(allCharacters);
        setError(false);
        return;
      }
      const data = await searchCharacter(value);
      if (lastSearch !== value) return;
      if (!data?.results?.length) {
        handleError(`No characters found for "${value}"`, "error");
        setSearchResult([]);
        return;
      }
      setSearchResult(data.results);
      setError(false);
    } catch (err) {
      handleError("An error occurred while searching", "error", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleClickCharacter(id) {
    try {
      setCharacterLoading(true);
      const data = await getCharacter(id);
      if (!data) {
        handleError("No episode found!", "error");
        return;
      }
      setEpisodes(data.episode.slice(0, 6));
    } catch (err) {
      handleError(
        "An error occurred while fetching character details",
        "error",
        err
      );
    } finally {
      setCharacterLoading(false);
      if (id !== charId) {
        setIsOpen(true);
        setCharId(id);
      } else {
        setCharId(null);
      }
    }
  }

  return (
    <>
      {toast.message && <Toast message={toast.message} type={toast.type} />}
      <div className="app">
        <Header handleSearch={handleSearch} />
        <div className="main">
          {loading ? (
            <Loading />
          ) : (
            <>
              <CharactersList
                allCharacters={searchResult}
                isOpen={isOpen}
                handleClickCharacter={handleClickCharacter}
                id={charId}
              />
              {isOpen &&
                (characterLoading ? (
                  <Loading />
                ) : (
                  <CharacterInfos
                    allCharacters={searchResult}
                    isOpen={isOpen}
                    id={charId}
                    episodes={episodes}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
