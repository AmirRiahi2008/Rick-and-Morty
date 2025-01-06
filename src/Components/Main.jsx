import { useState, useEffect } from "react";
import Header from "./Header";
import CharacterInfos from "./CharacterInfos";
import CharactersList from "./CharactersList";
import { getAllCharacters } from "../Services/GetAllCharacters.js";
import Loading from "./Loading";
import { searchCharacter } from "../Services/SearchCharacter.js";
export default function Main() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [charId, setCharId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function characters() {
      try {
        const charactersData = await getAllCharacters();

        setAllCharacters(charactersData.results);
      } catch (err) {
        console.log(err);
      }
    }
    characters();
  }, []);

  async function handleSearch(value) {
    try {
      const data = await searchCharacter(value);

      setSearchResult(data.results);
    } catch (err) {
      console.log(err);
    }
  }

  function handleClickCharacter(id) {
    if (id !== charId) {
      setLoading(true);
      setIsOpen(true);
      setCharId(id);
      setLoading(false);
    } else {
      setCharId(null);
      setLoading(false);
    }
  }

  return (
    <>
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
              allCharacters={allCharacters}
              isOpen={isOpen}
              handleClickCharacter={handleClickCharacter}
              id={charId}
            />
          ) : (
            []
          )}

          {loading ? (
            <Loading />
          ) : (
            <CharacterInfos
              allCharacters={allCharacters}
              isOpen={isOpen}
              id={charId}
            />
          )}
        </div>
      </div>
    </>
  );
}
