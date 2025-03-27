export function substring(str, indexStart, indexEnd) {
    let results = "";
    if(!indexEnd){
        indexEnd = str.length;
    }
    for(let i = indexStart; i < indexEnd; i++){
        results += str[i];
    }
    return results;
  }
  
  export function slice(str, indexStart, indexEnd) {
    let results = "";
    if(!indexEnd){
        indexEnd = str.length;
    }
    for(let i = indexStart; i < indexEnd; i++){
        results += str[i];
    }
    return results;
  }
  
  export function padStart(str, targetLength, padString) {
    // TODO: ここを実装しなさい
    return "TODO";
  }
  
  export function trim(str) {
    // TODO: ここを実装しなさい
    return "TODO";
  }
  
  const str = "Mozilla";

  console.log(substring(str,1, 3));
  // Expected output: "oz"
  
  console.log(substring(str,2));
  // Expected output: "zilla"