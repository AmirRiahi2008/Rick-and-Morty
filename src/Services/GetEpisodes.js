import { error, API_URL_EPISODE } from "../Helpers/init";

export async function getEpisodes() {
  try {
    const data = await fetch(`${API_URL_EPISODE}`);
    if (!data.status || !data.ok)
      error("Somethign went wrong during fetching Episodes!!");
    return await data.json();
  } catch (err) {
    console.log("Catch Block error");
  }
}
