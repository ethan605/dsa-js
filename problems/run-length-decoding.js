/*
 * See more: https://practice.geeksforgeeks.org/problems/run-length-encoding/1
 */

function encode(string) {
  let encodingChar = null;
  let count = 0;
  let encoded = '';

  for (let char of string) {
    if (char !== encodingChar) {
      if (encodingChar != null) {
        encoded += `${encodingChar}${count}`;
      }

      encodingChar = char;
      count = 1;
    } else {
      count += 1;
    }
  }

  encoded += `${encodingChar}${count}`;
  return encoded;
}

console.log(encode('wwwwaaadexxxxxx') === 'w4a3d1e1x6');
console.log(encode('aaaabbbccc') === 'a4b3c3');
console.log(encode('abbbcdddd') === 'a1b3c1d4');
