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

const GITHUB_REPO_URL = 'https://api.github.com/repos/misscoded/slack-bit-camp';

/**
 * To create a custom endpoint for our Slack app, we rely on 
 * the ExpressReceiver's router property.
 * 
 * In the example below, we've added a webhook via the Settings
 * section of a Github repository that we own, using the same
 * endpoint that we pass into the `post` method below. 
 * 
 * When creating your webhook in Github, make sure to set the 
 * Content Type to `application/json` and to listen for the 
 * 'Stars' webhook event.
 *  
 * Further Information & Resources
 * https://slack.dev/bolt-js/concepts#custom-routes
 */
receiver.router.post('/github-stars', async (req, res) => {
  const { action, repository, sender } = req.body;
  const verb = action === 'deleted' ? 'unstarred' : 'starred';
  const text = `${sender.login} just ${verb} the \`${repository.name}\` repository, bringing the total number of stars to ${repository.stargazers_count}.`;

  await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: 'development',
    text,
  });

  res.sendStatus(200);
});

/**
 * The app_home_opened event occurs when a user accesses an 
 * app's Home tab.
 * 
 * After enabling App Home within your app configuration, the 
 * home tab can be published and updated by passing a user_id
 * and view payload to the views.publish method.
 *  
 * Further Information & Resources
 * https://slack.dev/bolt-js/concepts#publishing-views
 */
app.event('app_home_opened', async ({ event, client }) => {

  const { data: issues } = await axios.get(`${GITHUB_REPO_URL}/issues`);

  const issueBlocks = issues.map(issue => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `<${issue.html_url}|${issue.title}> opened by <${issue.user.html_url}|${issue.user.login}>`
    },
  }));

  await client.views.publish({
    user_id: event.user,
    view: {
      type: 'home',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'Open Issues'
          },
        },
        ...issueBlocks,
      ]
    }
  });

});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running! ⚡️');
})();
