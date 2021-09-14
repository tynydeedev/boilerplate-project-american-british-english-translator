const americanOnly = require('./american-only.js');
const americanArray = Object.keys(americanOnly);

const americanToBritishSpelling = require('./american-to-british-spelling.js');
const spellingArray = Object.keys(americanToBritishSpelling);

const americanToBritishTitles = require("./american-to-british-titles.js");
const titleArray = Object.keys(americanToBritishTitles);

const britishOnly = require('./british-only.js')
const britishArray = Object.keys(britishOnly);

class Translator {
  americanInput(input) {
    const sentence = input;

    let returnSentence = sentence;
    // replace the words by iterate through the arrays and find matches
    for (let i = 0; i < americanArray.length; i++) {
      const regex = new RegExp(`\\s${americanArray[i]}(?=[\\s\\.])`, 'i');
      if (regex.test(returnSentence)) returnSentence = returnSentence.replace(regex, ` <span class='highlight'>${americanOnly[americanArray[i]]}</span> `);
    }
    for (let i = 0; i < spellingArray.length; i++) {
      const regex = new RegExp(`\\s${spellingArray[i]}\\s`, 'i');
      if (regex.test(returnSentence)) returnSentence = returnSentence.replace(regex, ` <span class='highlight'>${americanToBritishSpelling[spellingArray[i]]}</span> `);
    }
    for (let i = 0; i < titleArray.length; i++) {
      const regex = new RegExp(`\\s${titleArray[i]}\\s`, 'i');
      if (regex.test(returnSentence)) {
        const title = returnSentence.match(regex)[0];
        returnSentence = returnSentence.replace(regex, ` <span class='highlight'>${title.slice(0, title.length - 1)}</span> `);
      }
    }
    
    if (/^[a-z]/.test(returnSentence)) {
      returnSentence = returnSentence.charAt(0).toUpperCase() + returnSentence.slice(1);
    }
    console.log(returnSentence);
    if (sentence === returnSentence) return 'No change';
    return returnSentence;
  }
}

module.exports = Translator;