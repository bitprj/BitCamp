const { App, ExpressReceiver } = require('@slack/bolt');
const express = require('express');
const axios = require('axios');

const { config } = require('dotenv');

config();

const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });
receiver.router.use(express.json());

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver
});

const GITHUB_REPO_URL = 'https://github.com/FifiTeklemedhin/IB-1-Programming-Projects';

receiver.router.post('/github-comments', async (req, res) => {
  const {comment, action, repository, sender} = req.body;

  var name = "The repo has no name";
    if(repository.name != null)
      name =  `${repository.name}`;

  const verb = action; 
  const text = `${sender.login} just ${verb} a comment in the ${name} repository. Comment: ${comment.body}`; //

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
