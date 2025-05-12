export function parseJSON(s){
    try{
        return {success: true, data: JSON.parse(s)};
    }catch(e){
        return {success: false, data: e.message}
    }
}