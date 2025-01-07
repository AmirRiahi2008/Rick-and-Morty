import { API_URL, error } from '../Helpers/init'
export async function searchCharacter(name) {
    try{
        const data = await fetch(`${API_URL}?name=${name}&status=alive`)
        if(!data.status || !data.ok ) error("Somethign went wrong during fetching search character!!");
        
       
        return await data.json()
    }catch(err){
        console.log("err");
        
    }
}