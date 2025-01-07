import { useState, useEffect } from "react";

import { searchCharacter } from "../Services/SearchCharacter.js";
import { getAllCharacters } from "../Services/GetAllCharacters.js";
import Loading from "./Loading";
import Toast from "./Toast";
import Header from "./Header";
import CharacterInfos from "./CharacterInfos";
import CharactersList from "./CharactersList";

export default function Main() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [charId, setCharId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "ef", type: "error" });
  const [error, setError] = useState(false);

  useEffect(() => {
    async function characters() {
      try {
        const charactersData = await getAllCharacters();

        setAllCharacters(charactersData.results);
        setSearchResult(charactersData.results);
      } catch (err) {
        console.log(err);
      }
    }
    characters();
  }, []);

  let lastSearch = null;
  async function handleSearch(value) {
    lastSearch = value;
    try {
      if (!value || value.trim() === "") {
        setSearchResult(allCharacters);
        setError(false);
        return;
      }

      const data = await searchCharacter(value);

      if (lastSearch !== value) return;

      if (!data || !data.results || data.results.length === 0) {
        setIsOpen(false);
        setToast({
          message: `No characters found for "${value}"`,
          type: "error",
        });
        setError(true);
        setSearchResult([]);
        return;
      }
      setSearchResult(data.results);
      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setToast({ message: "An error occurred while searching", type: "error" });
    }
  }

  function handleClickCharacter(id) {
    if (id !== charId) {
      setIsOpen(true);
      setCharId(id);
    } else {
      setCharId(null);
    }
  }

  return (
    <>
      {error && <Toast message={toast.message} type={toast.type} />}

      <div className="app">
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            inset: "16px",
            pointerEvents: "none",
          }}
        ></div>
        <Header handleSearch={handleSearch} />
        <div className="main">
          {Array.isArray(allCharacters) ? (
            <CharactersList
              allCharacters={searchResult}
              isOpen={isOpen}
              handleClickCharacter={handleClickCharacter}
              id={charId}
            />
          ) : (
            []
          )}

          <CharacterInfos
            allCharacters={searchResult}
            isOpen={isOpen}
            id={charId}
          />
        </div>
      </div>
    </>
  );
}
