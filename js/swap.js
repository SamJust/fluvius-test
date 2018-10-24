const arr = [10, 20, 30, 40];

function swap([a, b, ...rest]){
  return [b, a, ...rest];
}

console.log(swap(arr))