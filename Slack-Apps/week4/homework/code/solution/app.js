<<<<<<< HEAD
// ************ Packages Needed ************
const { App, ExpressReceiver } = require('@slack/bolt');
const express = require('express');
=======

const { App, ExpressReceiver } = require('@slack/bolt');
const express = require('express');

const axios = require('axios');

>>>>>>> 8c7456f0803ead927544ed6ba9f66f58440daa73
const { config } = require('dotenv');

config();

// ************ Initializing Variables ************
// Express object: this is an ExpressReceiver which gets and posts payloads
const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });
receiver.router.use(express.json());

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver
});

// ************ POST Method ************
// function signature: specifies the request endpoint (where the webhook payload will be sent)
receiver.router.post('/github-comments', async (req, res) => {
  // specifies what information we will use from the payload (payload is found in req object)
  const {comment, action, repository, sender} = req.body;
  const name = repository.name;

  // this string has the message sent in the channel. It uses the information accessed from the req object
  const text = `${sender.login} just ${action} a comment in the ${name} repository. Comment: ${comment.body}`; //

  // posts the message to a specified channel
  await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: 'welcome',
    text,
  });

  res.sendStatus(200);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running! ⚡️');
})();
