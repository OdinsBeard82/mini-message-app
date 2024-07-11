var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

/* GET new message form. */
router.get('/new', function (req, res, next) {
  res.render('form', { title: 'New Message Form' });
});

/* POST new message. */
router.post('/new', function (req, res, next) {
  const { author, message } = req.body;
  const newMessage = {
    text: message,
    user: author,
    added: new Date()
  };
  messages.push(newMessage); // Add the new message to the messages array
  res.redirect('/'); // Redirect back to the home page after adding the message
});

module.exports = router;
