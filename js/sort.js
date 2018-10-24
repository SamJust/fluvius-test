const list = [30, -5, 0, 10, 5];

function swap(arr, i) {
  const temp = arr[i];
  arr[i] = arr[i+1];
  arr[i+1] = temp;
}

function mySort(list) {
  let swapped;
  do{
    swapped = false;
    for(let i = 0; i < list.length; i++){
      if(list[i] > list[i+1]){
        swap(list, i);        
        swapped = true;
      }
    }
  }while(swapped);
}

mySort(list);

console.log(list);
