import { API_URL, error } from "../Helpers/init";

export async function getAllCharacters() {
  try {
    const data = await fetch(`${API_URL}`);
    if(!data.status || !data.ok ) error("Somethign went wrong during fetching All Characters!!");

    return await data.json();
  } catch (err) {
    console.log(err);
  }
}
