/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, "");
  orignal = str;
  a1 = str.split("");
  a2 = orignal.split("").reverse();
  let isPal = true;
  if(a1.length != a2.length){
    isPal = false;
  }else{
    for(let i =0; i<a1.length; i++){
      if(a1[i]!= a2[i]){
        isPal = false;
      }
    }
  }
  return isPal;
}

module.exports = isPalindrome;
