const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator = new Translator();

suite('Functional Tests', () => {
  test('POST with text and locale fields', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: "Mangoes are my favorite fruit.",
        locale: 'american-to-british'
      })
      .end((err, res) => {
        const string = 'Mangoes are my favorite fruit.';
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, translator.americanInput(string), 'should equal to the result from the function');
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.', 'should get the expected result')
        done();
      })
  });
  test('POST with invalid locale', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: 'Mangoes are my favorite fruit.',
        locale: 'brazil-to-chile'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid value for locale field', 'should return an error of invalid locale');
        done();
      })
  });
  test('POST with missing text field', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        locale: 'american-to-british'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing', 'should return an error of missing field');
        done();
      })
  });
  test('POST with missing locale field', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: 'I climb every mountain.'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing', 'should return an error of missing field');
        done();
      })
  });
  test('POST with empty text field', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: "",
        locale: 'american-to-british'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'No text to translate', 'should return an error of missing field');
        done();
      })
  });
  test('POST with valid text', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .type('form')
      .send({
        text: "I climb every mountain",
        locale: 'american-to-british'
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.translation, 'Everything looks good to me!', 'should return a congrat');
        done();
      })
  })
});
