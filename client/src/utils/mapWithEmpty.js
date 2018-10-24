export default function mapWithEmpty(arr, cb){
  const newArr = [];
  for(let i = 0; i < arr.length; i++){
    newArr.push(cb(arr[i], i, arr));
  }
  return newArr;
}