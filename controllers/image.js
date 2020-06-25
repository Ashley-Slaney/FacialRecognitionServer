const Clarifai = require('clarifai');

//API KEY
const app = new Clarifai.App({
  apiKey: '970bb185830f464993f3b8e19f5402da'
});

const handleApiCall = (req, res) => {
  app.models
  .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}