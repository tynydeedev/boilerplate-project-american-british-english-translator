const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('American to British', () => {
    test('1st sentence', () => {
      const output = translator.americanInput('Mangoes are my favorite fruit.');
      assert.include(output, 'favourite', 'should change favorite to favourite');
    });
    test('2st sentence', () => {
      const output = translator.americanInput('I ate yogurt for breakfast.');
      assert.include(output, 'yoghurt', 'should change yogurt to yoghurt');
    });
    test('3rd sentence', () => {
      const output = translator.americanInput("We had a party at my friend's condo.");
      assert.include(output, "flat", 'should change condo to flat');
    });
    test('4th sentence', () => {
      const output = translator.americanInput("Can you toss this in the trashcan for me?");
      assert.include(output, "bin", 'should change trashcan to bin');
    });
    test('5th sentence', () => {
      const output = translator.americanInput("The parking lot was full.");
      assert.include(output, "car park", 'should change parking lot to car park');
    });
    test('6th sentence', () => {
      const output = translator.americanInput("Like a high tech Rube Goldberg machine.");
      assert.include(output, "Heath Robinson device", 'should change machine to device');
    });
    test('7th sentence', () => {
      const output = translator.americanInput("To play hooky means to skip class or work.");
      assert.include(output, "bunk off", 'should change play hooky to bunk off');
    });
    test('8th sentence', () => {
      const output = translator.americanInput("No Mr. Bond, I expect you to die.");
      assert.include(output, "Mr Bond", 'should change Mr. to Mr');
    });
    test('8th sentence', () => {
      const output = translator.americanInput("Dr. Grosh will see you now.");
      assert.include(output, "Dr Grosh", 'should change Dr. to Dr');
    });
    test('9th sentence', () => {
      const output = translator.americanInput("Lunch is at 12:15 today.");
      assert.include(output, "12.15", 'should change 12:15 to 12.15');
    });
  });

  suite('British to American', () => {
    test('1st sentence', () => {
      
    })
  })
});
