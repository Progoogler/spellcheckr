'use strict';

let keywords = {'else': true, 'instanceof': true, 'super': true, 'boolean': true, 'int': true, 'switch': true,
  'break': true, 'export': true, 'byte': true, 'extends': true, 'let': true, 'this': true, 'case': true, 'false': true,
   'long': true, 'throw': true, 'catch': true, 'final': true, 'native': true, 'throws': true, 'char': true, 'finally': true, 'new': true,   
   'transient': true, 'class': true, 'float': true, 'null': true, 'true': true, 'const': true, 'for': true, 
   'package': true, 'try': true, 'continue': true, 'function': true, 'private': true, 'typeof': true, 'debugger': true,  
   'goto': true, 'protected': true, 'var': true, 'default': true, 'if': true, 'public': true, 'void': true,
   'delete': true, 'implements': true, 'return': true, 'volatile': true, 'do': true, 'import': true, 'short': true,
   'while': true, 'double': true, 'in': true, 'static': true, 'with': true, 'use': true, 'use': true, 'strict': true, 'require': true,
   'arguments': true, 'object': true, 'constructor': true
};

let spellCheck = (str) => {
  let tracker = {};
  let base = '';
  let potentialErrors = [];
  let errors = {};

  for (let i = 0, len = str.length; i < str.length; i++) {
    if ((str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) || 
      (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122)) {
      base = '';
      while ((str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) || 
      (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122)) {
        base += str[i];
        i++;
      }
      // ignore console logs
      if (base === 'console') {
        while(str[i] !== ')') {
          i++;
        }
        continue;
      }
      if (tracker[base] === undefined) {
        tracker[base] = 1;
      } else {
        tracker[base] += 1;
      }
    }
    // ignore block comments only -- when does this line comment end?
    if (str[i] === '/' && str[i + 1] === '*') {
      i += 3;
      while (str[i] !== '*' && str[i + 1] !== '/') {
        i++;
      }
      continue;
    } 
  }

  for (let word in tracker) {
    if (tracker[word] === 1 && !keywords[word]) {
      potentialErrors.push(word);
    }
  }
  console.log(potentialErrors)

  for (let i = 0; i < potentialErrors.length; i++) {
    let problem = potentialErrors[i];
    for (let word in tracker) {
      if (problem === word || tracker[word] === 1) continue;
      if ((word.startsWith(problem[0]) || word.endsWith(problem[problem.length - 1])) &&
          (word.length - problem.length === 0 || (word.length - problem.length >= 1 &&
          word.length - problem.length <= 2) || (word.length - problem.length >= -2 && 
          word.length - problem.length <= -1))) {

        let problemCount = {};
        let wordCount = {};
        let degree = 0;
        for (let m = 0; m < problem.length; m++) {
          if (!problemCount[problem[m]]) {
            problemCount[problem[m]] = 1;
          } else {
            problemCount[problem[m]]++;
          }
        }

        for (let n = 0; n < word.length; n++) {
          if (!wordCount[word[n]]) {
            wordCount[word[n]] = 1;
          } else {
            wordCount[word[n]]++;
          }
        }
        for (let letter in wordCount) {
          if (wordCount[letter] !== problemCount[letter]) {
            degree++;
          }
        }   
              
        if (problem.length <= 5) {
          // if degree === 0 it may be due to short length and vowels        
          if (degree <= 1) {
            if (!errors[problem]) errors[problem] = word;
            break;
          }       
        } else if (degree <= 2) {
          if (!errors[problem]) errors[problem] = word;
          break;
        }
      }
    }
  }
  console.log(errors)
  return errors;
}