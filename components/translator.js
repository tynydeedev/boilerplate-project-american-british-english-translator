const americanOnly = require('./american-only.js');
const americanArray = Object.keys(americanOnly);

const americanToBritishSpelling = require('./american-to-british-spelling.js');
const spellingArray = Object.keys(americanToBritishSpelling);

const americanToBritishTitles = require("./american-to-british-titles.js");
const titleArray = Object.keys(americanToBritishTitles);

const britishOnly = require('./british-only.js')
const britishArray = Object.keys(britishOnly);

class Translator {
  // Create new Regex that find the string but without any word or dash before or after
  regexCreator(str) {
    return new RegExp(`(?<![\\w\\-])${str}(?![\\w\\-])`, 'i');
  }

  spanCreator(str) {
    return `<span class="highlight">${str}</span>`
  }

  americanInput(input) {
    const sentence = input;
    let returnSentence = input;

    // replace the words by iterate through the arrays and find matches
    for (let i = 0; i < americanArray.length; i++) {
      const regex = this.regexCreator(americanArray[i]);
      if (regex.test(returnSentence)) returnSentence = returnSentence.replace(regex, this.spanCreator(americanOnly[americanArray[i]]));
    }
    for (let i = 0; i < spellingArray.length; i++) {
      const regex = this.regexCreator(spellingArray[i]);
      if (regex.test(returnSentence)) returnSentence = returnSentence.replace(regex, this.spanCreator(americanToBritishSpelling[spellingArray[i]]));
    }
    for (let i = 0; i < titleArray.length; i++) {
      const regex = this.regexCreator(titleArray[i]);
      if (regex.test(returnSentence)) {
        const title = returnSentence.match(regex)[0];
        returnSentence = returnSentence.replace(regex, this.spanCreator(title.slice(0, title.length - 1)));
      }
    }

    // Convert the time
    const timeRegex = /(?<=\d{1,2}):(?=\d{2})/;
    if (timeRegex.test(returnSentence)) returnSentence = returnSentence.replace(timeRegex, '.');

    if (/^[a-z]/.test(returnSentence)) returnSentence = returnSentence.charAt(0).toUpperCase() + returnSentence.slice(1);

    if (sentence === returnSentence) return 'Everything looks good to me!';

    return returnSentence;
  }

  britishInput(input) {
    const sentence = input;
    let returnSentence = sentence;

    // replace the words by iterate through the values of the keys and find matches
    for (let i = 0; i < britishArray.length; i++) {
      const regex = this.regexCreator(britishArray[i]);
      if (regex.test(returnSentence)) returnSentence = returnSentence.replace(regex, this.spanCreator(britishOnly[britishArray[i]]));
    }
    for (let i = 0; i < spellingArray.length; i++) {
      const regex = this.regexCreator(americanToBritishSpelling[spellingArray[i]]);
      if (regex.test(returnSentence)) returnSentence = returnSentence.replace(regex, this.spanCreator(spellingArray[i]));
    }
    for (let i = 0; i < titleArray.length; i++) {
      const regex = this.regexCreator(americanToBritishTitles[titleArray[i]]);
      if (regex.test(returnSentence)) {
        const title = returnSentence.match(regex)[0];
        returnSentence = returnSentence.replace(regex, this.spanCreator(title + '.'));
      }
    }

    // Convert the time
    const timeRegex = /(?<=\d{1,2}).(?=\d{2})/;
    if (timeRegex.test(returnSentence)) returnSentence = returnSentence.replace(timeRegex, ':');

    if (/^[a-z]/.test(returnSentence)) returnSentence = returnSentence.charAt(0).toUpperCase() + returnSentence.slice(1);

    if (sentence === returnSentence) return 'Everything looks good to me!';

    return returnSentence;
  }
}

module.exports = Translator;