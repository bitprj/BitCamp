const { App } = require('@slack/bolt');
const { config } = require('dotenv');

config();
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

/* Listening for Reaction Emojis */
// Your app *must* be in the channel of the message
// Event subscription: reaction_added
// Required scope(s): reactions:read

app.event('reaction_added', async ({ event, client }) => {
    const { reaction, user, item: { channel, ts } } = event;
  
    // Warning: some flags don't contain 'flag-' (US, Japan)
    
    if (!reaction.includes('flag-')) return;
  
    const [x, country] = reaction.split('-');
  
    let translatedText;
  
    // TODO :: better to turn this into a map of emoji country codes with values 
    // of the corresponding API country code if they differ (unverified)

    switch (country) {
      case 'mx':
        // TODO :: call translation API
        translatedText = 'This is in Spanish';
        break;
      case 'jp':
        // TODO :: call translation API
        translatedText = 'This is in Japanese';
        break;
    }
  
    if (translatedText) {
      await client.chat.postMessage({
        channel,
        thread_ts: ts,
        text: translatedText
      });
    }
  
  });
  
  (async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  })();
