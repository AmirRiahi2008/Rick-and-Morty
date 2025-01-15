import Character from "./Character";
export default function CharactersList({
  allCharacters,
  handleClickCharacter,
  id,
  isOpen
}) {
  
  const characters = allCharacters
    .slice(0, 5)
    .map((character, index) => (
      <Character
        key={character.id}
        index={index}
        info={character}
        onClick={handleClickCharacter}
        isOpen={isOpen}
        id={id}
        
      />
    ));
    if(!characters)console.log("lfheohff");
    

  return (
    <>
      <div className="characters-list">{characters}</div>
    </>
  );
}
