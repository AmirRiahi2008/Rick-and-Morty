import { API_URL, error } from '../Helper/init'
export async function searchCharacter(name) {
    try{
        const data = await fetch(`${API_URL}?name=${name}&status=alive`)
        error(data)
        return await data.json()
    }catch(err){
        console.log(err);
        
    }
}