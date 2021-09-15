'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log(req.body);
      const text = req.body.text;
      const locale = req.body.locale;

      if (text === "") return res.json({ error: 'No text to translate' });

      if (!text || !locale) return res.json({ error: 'Required field(s) missing' });

      if (locale !== 'american-to-british' && locale !== 'british-to-american') return res.json({ error: 'Invalid value for locale field' });

      const translation = (locale === 'american-to-british') ? translator.americanInput(text) : translator.britishInput(text);

      return res.json({ text: text, translation: translation })
    });
};
