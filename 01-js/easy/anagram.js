/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  firstWord = str1.toLowerCase().split('').sort();
  secondWord = str2.toLowerCase().split('').sort();
  let isAnagram = true;
  if(firstWord.length!=secondWord.length){
    isAnagram = false;
  }else{
    for(let i =0 ; i < firstWord.length ; i++){
      if(firstWord[i]!=secondWord[i]){
        isAnagram = false;
        break;
      }
    }
  }
  return isAnagram;
}

module.exports = isAnagram;
