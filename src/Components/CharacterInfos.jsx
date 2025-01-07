export default function CharacterInfos({ allCharacters, isOpen, id }) {
  const a = allCharacters.slice(0, 5).filter((char) => char.id === id);
  

  return (
    <>
      {isOpen && a[0] ? (
        <div
          style={{
            flex: "1 1 0%",
            color: "var(--slate-300)",
          }}
          data-darkreader-inline-color=""
        >
          <div className="character-detail">
            <img
              src={a[0].image}
              alt="Rick Sanchez"
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
              <button>
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
              <li>
                <div>
                  01-S01E01 : <strong>Pilot</strong>
                </div>
                <div className="badge badge--secondary">December 2, 2013</div>
              </li>
              <li>
                <div>
                  02-S01E02 : <strong>Lawnmower Dog</strong>
                </div>
                <div className="badge badge--secondary">December 9, 2013</div>
              </li>
              <li>
                <div>
                  03-S01E03 : <strong>Anatomy Park</strong>
                </div>
                <div className="badge badge--secondary">December 16, 2013</div>
              </li>
              <li>
                <div>
                  04-S01E04 : <strong>M. Night Shaym-Aliens!</strong>
                </div>
                <div className="badge badge--secondary">January 13, 2014</div>
              </li>
              <li>
                <div>
                  05-S01E05 : <strong>Meeseeks and Destroy</strong>
                </div>
                <div className="badge badge--secondary">January 20, 2014</div>
              </li>
              <li>
                <div>
                  06-S01E06 : <strong>Rick Potion #9</strong>
                </div>
                <div className="badge badge--secondary">January 27, 2014</div>
              </li>
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
          Please select a character
        </div>
      )}
    </>
  );
}
