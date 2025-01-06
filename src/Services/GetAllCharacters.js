import { API_URL, error } from "../Helper/init";

export async function getAllCharacters() {
  try {
    const data = await fetch(`${API_URL}`);
    error(data)
    return await data.json();
  } catch (err) {
    console.log(err);
  }
}
