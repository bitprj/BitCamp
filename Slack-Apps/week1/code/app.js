const { App } = require('@slack/bolt');
const { config } = require('dotenv');

config();
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

/**
 * Messages can be listened for, using specific words and phrases.
 * Note: your Slack app *must* be subscribed to the following events
 * and scopes, as well as be present in the channels where they occur.
 * 
 * Please see the 'Event Subscriptions' and 'OAuth & Permissions'
 * sections of your app's configuration to add the following:
 * 
 * Event subscription required:   messages.channels
 * OAuth scope required:          chat:write
 * 
 * Further Information & Resources
 * https://slack.dev/bolt-js/concepts#message-listening
 * https://api.slack.com/messaging/retrieving#permissions
 */
app.message('hello', async ({ message, say }) => {
  await say(`Hello, <@${message.user}>!`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running! ⚡️');
})();
