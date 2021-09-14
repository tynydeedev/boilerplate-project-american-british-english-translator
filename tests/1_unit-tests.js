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
      assert.include(output, "Mr</span>", 'should change Mr. to Mr');
    });
    test('8th sentence', () => {
      const output = translator.americanInput("Dr. Grosh will see you now.");
      assert.include(output, "Dr</span>", 'should change Dr. to Dr');
    });
    test('9th sentence', () => {
      const output = translator.americanInput("Lunch is at 12:15 today.");
      assert.include(output, "12.15", 'should change 12:15 to 12.15');
    });
  });

  suite('British to American', () => {
    test('1st sentence', () => {
      const output = translator.britishInput("We watched the footie match for a while.");
      assert.include(output, 'soccer', 'should change footie to soccer');
    })
    test('2nd sentence', () => {
      const output = translator.britishInput("Paracetamol takes up to an hour to work.");
      assert.include(output, 'Tylenol', 'should change Paracetamol to Tylenol');
    })
    test('3rd sentence', () => {
      const output = translator.britishInput("First, caramelise the onions.");
      assert.include(output, 'caramelize', 'should change caramelise to caramelize');
    })
    test('4th sentence', () => {
      const output = translator.britishInput("I spent the bank holiday at the funfair.");
      assert.include(output, 'public holiday', 'should change bank to public');
      assert.include(output, 'carnival', 'should change funfair to carnival');
    })
    test('5th sentence', () => {
      const output = translator.britishInput("I had a bicky then went to the chippy.");
      assert.include(output, 'cookie', 'should change bicky to cookie');
      assert.include(output, 'fish-and-chip shop', 'should change "chippy" to "fish-and-chip shop"');
    })
    test('6th sentence', () => {
      const output = translator.britishInput("I've just got bits and bobs in my bum bag.");
      assert.include(output, 'odds and ends', 'should change "bits and bobs" to "odds and ends"');
      assert.include(output, 'fanny pack', 'should change "bum bag" to "fanny pack"');
    })
    test('6th sentence', () => {
      const output = translator.britishInput("The car boot sale at Boxted Airfield was called off.");
      assert.include(output, 'swap meet', 'should change "car boot sale" to "swap meet"');
    })
    test('7th sentence', () => {
      const output = translator.britishInput("Have you met Mrs Kalyani?");
      assert.include(output, 'Mrs.', 'should change Mrs to Mrs.');
    })
    test('8th sentence', () => {
      const output = translator.britishInput("Prof Joyner of King's College, London.");
      assert.include(output, 'Prof.', 'should change Prof to Prof.');
    })
    test('9th sentence', () => {
      const output = translator.britishInput("Tea time is usually around 4 or 4.30.");
      assert.include(output, '4:30', 'should change 4.30 to 4:30');
    })
  })
});
