const { App } = require('@slack/bolt');
const { config } = require('dotenv');

config();
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

/**
 * Shortcuts can be global (accessible from anywhere in Slack), 
 * or specific to messages (shown only in message context menus).
 * 
 * Shortcuts can trigger both modals and other app interactions.
 *  
 * Further Information & Resources
 * https://slack.dev/bolt-js/concepts#shortcuts
 */
app.shortcut('create_poll', async ({ ack, shortcut, client }) => {
  await ack();

  const { user, trigger_id } = shortcut;

  await client.views.open({
    trigger_id,
    view: {
      type: 'modal',
      callback_id: 'poll_shortcut_modal',
      title: {
        type: 'plain_text',
        text: 'Create new poll',
      },
      blocks: [

        // Channel Selection
        {
          type: "input",
          block_id: "target_conversation",
          element: {
            type: "conversations_select",
            placeholder: {
              type: "plain_text",
              text: "Select a conversation",
              emoji: true
            },
            filter: {
              include: [
                "public",
                "mpim"
              ],
              exclude_bot_users: true
            },
            action_id: 'input',
          },
          label: {
            type: "plain_text",
            text: "Select the conversation to publish your poll to:",
            emoji: true
          }
        },

        // Poll Question
        {
          type: 'input',
          block_id: 'poll_question',
          element: {
            type: 'plain_text_input',
            action_id: 'input'
          },
          label: {
            type: 'plain_text',
            text: 'Poll Question',
            emoji: true
          }
        },

        // Poll Options
        {
          type: 'input',
          block_id: 'option_1',
          element: {
            type: 'plain_text_input',
            action_id: 'input'
          },
          label: {
            type: 'plain_text',
            text: 'Option 1',
            emoji: true
          }
        },
        {
          type: 'input',
          block_id: 'option_2',
          element: {
            type: 'plain_text_input',
            action_id: 'input'
          },
          label: {
            type: 'plain_text',
            text: 'Option 2',
            emoji: true
          }
        },
        {
          type: 'input',
          block_id: 'option_3',
          element: {
            type: 'plain_text_input',
            action_id: 'input'
          },
          label: {
            type: 'plain_text',
            text: 'Option 3',
            emoji: true
          }
        }
      ],
      submit: {
        type: 'plain_text',
        text: 'Start Poll'
      },
    },
  });
});

/**
 * The view_sumbmission event occurs when a modal is submitted by 
 * the user.
 * 
 * The ID used in app.view() to identify the view corresponds to
 * the callback_id used where the view was defined and sent via
 * client.views.open(). 
 *  
 * Further Information & Resources
 * https://slack.dev/bolt-js/concepts#view_submissions
 */
app.view('poll_shortcut_modal', async ({ ack, body, view, client }) => {
  await ack();

  const { user } = body;

  /* Grab Modal Input Values */
  const {
    target_conversation,
    poll_question,
    option_1,
    option_2,
    option_3,
  } = view.state.values;

  /* Add Voting Emoji Options */
  // Your app *must* be in the channel you're posting to
  // Required scope(s): chat:write
  const { channel, ts } = await client.chat.postMessage({
    channel: target_conversation.input.selected_conversation,
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `<@${user.id}> wants to know: *${poll_question.input.value}*`
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": `:one: ${option_1.input.value}`,
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": `:two: ${option_2.input.value}`,
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": `:three: ${option_3.input.value}`,
          "emoji": true
        }
      }
    ]
  });

  /* Add Voting Emoji Options */
  // Required scope(s): reactions:write
  await client.reactions.add({
    channel,
    name: "one",
    timestamp: ts
  });

  await client.reactions.add({
    channel,
    name: "two",
    timestamp: ts
  });

  await client.reactions.add({
    channel,
    name: "three",
    timestamp: ts
  });
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running! ⚡️');
})();
