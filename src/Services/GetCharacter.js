import { API_URL, error } from '../Helper/init'

export async function getCharacter(id) {
        try{
            const data = await fetch(`${API_URL}${id}`)
            if(!data.status || !data.ok ) error("Somethign went wrong during fetching get specifec character!!");

            return await data.json()
            
        }catch(err){
            console.log(err);
            
        }
}