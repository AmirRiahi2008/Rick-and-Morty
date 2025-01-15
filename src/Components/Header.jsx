import { useEffect } from "react";
import useInput from "../Hooks/useInput";

export default function Header({
  handleSearch,
  handleClickLikeBox,
  isOpenLikedBox,
  handleDeleteLikedCharacter,
  likedChars
}) {
  const name = useInput("");

  useEffect(() => {
    handleSearch(name.value);
  }, [name.value]);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img
          src="images/rick-and-morty-tv-logo.png"
          alt="Rick and Morty logo"
        />
      </div>
      <input
        type="text"
        className="text-field"
        placeholder="Search..."
        {...name}
      />
      <div className="navbar__result">
        Found {name.value ? "search results" : "all characters"}
      </div>

      {isOpenLikedBox ? (
        <div>
          <div className="backdrop" onClick={handleClickLikeBox}></div>
          <div className="modal">
            <div className="modal__header">
              <h2 className="title">List of Favorites</h2>
              <button onClick={handleClickLikeBox}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="icon close"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
            {likedChars.length
              ? likedChars.map((char, index) => (
                  <div className="list__item" key={index} data-id={char.id}>
                    <img
                      src={char.image}
                      alt={char.name}
                    />
                    <h3 className="name">
                      <span>{char.gender === "Male" ? "🧔🏻‍♂️" : "👩🏻‍🦰"}</span>
                      <span>{char.name}</span>
                    </h3>
                    <div className="list-item__info info">
                      <span className="status"></span>
                      <span> {char.status} </span>
                      <span> - {char.species} </span>
                    </div>
                    <button
                      className="icon red"
                      onClick={handleDeleteLikedCharacter}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : (
        <button className="heart" onClick={handleClickLikeBox}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className="badge">
            {JSON.parse(localStorage.getItem("liked"))
              ? JSON.parse(localStorage.getItem("liked")).length
              : 0}
          </span>
        </button>
      )}
    </nav>
  );
}
