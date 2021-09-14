const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  americanInput(input) {
    const notationRegex = /[^a-zA-Z0-9]+$/;
    let notation = '';
    let sentence = '';
    if (notationRegex.test(input)) {
      notation = input.match(notationRegex)[0];
      sentence = input.slice(0, input.length - notation.length);
    }
    sentence = input;
    const words = sentence.split(' ');
    const converted = words.map(word => {
      switch (true) {
        case americanOnly.hasOwnProperty(word):
          return `<span class="highlight">${americanOnly[word]}</span>`;
        case americanToBritishSpelling.hasOwnProperty(word):
          return `<span class="highlight">${americanToBritishSpelling[word]}</span>`;
        case americanToBritishTitles.hasOwnProperty(word):
          return `<span class="highlight">${americanToBritishTitles[word]}</span>`;
      }
      return word;
    });
    const returnSentence = converted.join(' ');
    if (sentence === returnSentence) return 'No change'
    return returnSentence + notation;
  }
}

module.exports = Translator;