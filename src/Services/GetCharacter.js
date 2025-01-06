import { API_URL, error } from '../Helper/init'

export async function getCharacter(id) {
        try{
            const data = await fetch(`${API_URL}${id}`)
            error(data)
            return await data.json()
            
        }catch(err){
            console.log(err);
            
        }
}