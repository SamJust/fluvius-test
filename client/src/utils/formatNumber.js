export default function(number, length){
  let string = number.toString();
  while(string.length < length){
    string = `0${string}`;
  }
  return string;
}