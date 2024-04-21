const express = require('express');
const { feel } = require('js-feel')();

const app = express();
app.use(express.json());

app.post('/make-leave-decision', (req, res) => {
  const decision = 'if approved then "Go to Holiday" else "Go to Office"';
  const context = req.body;

  const parsedGrammar = feel.parse(decision);
  parsedGrammar.build(context)
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
