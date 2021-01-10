# Week 2 Livestream

During Week 1, you have learned how to work with the Slack API. This week, you will utilize the Slack API to create apps using shortcuts, modals, and Block Kit.

## Objectives

### Week 2 Objectives

This week's goals include:

- Understand and use BlockKit
- Understand modals and views
- Create a polling slack app that uses a view and modal

### Livestream Objectives

The livestream will be the first step to reaching the weekly objectives mentioned above. It will be a guided tutorial on how to create a polling Slack app. The following concepts are going to be covered:

- How to create a shortcut
- Integrating a block within a modal (in this case, a shortcut)
- Creating a view within a message 
- Integrating a block within a message



## Creating a Shortcut

To start this project, you will first need to create a Slack app. Refer to the [issues for week 1](https://github.com/bitprj/BitCamp/tree/master/Slack-Apps/week1/homework/responses) for a review on how to do this. Next, you will need to create a shortcut. Shortcuts enable users of the app to easily find features using '/'. The outline for a shortcut is as follows:

```javascript
app.shortcut('create_poll', async ({ ack, shortcut, client }) => {
  await ack();
});
```

The only parameter you change is the trigger id, which is the first parameter. This is used to listen for when the shortcut is called. 



### Views

The next step is to make a view that pops up when the shortcut is invoked. First, create a constant that gets the necessary information to create a view:

```javascript
const { user, trigger_id } = shortcut;
```

The trigger id is going to be necessary for the app to recognize when to open the shortcut. Next, you will need to create a view, input the trigger id, and specify what type of view you want to create:

```javascript
await client.views.open({
    trigger_id,
    view: {
      type: 'modal',
      callback_id: 'poll_shortcut_modal',
      title: {
        type: 'plain_text',
        text: 'Create new poll',
      },
 });  
```

>  **Note: ** everything in the rest of the client.views.open() call will be in the view object, save for submitting the view. 



### Making a block

Now it is time to assemble your view's interface using a block. You will first specify the channel that the poll should open in:

```javascript
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
```

This section of the block includes the type of information the view wants, which is user input through a selector tool.  Now it is time to build an interface for the user to create a polling question. This is a shorter version of the channel selection code.

```javascript
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
```

Note that the type of block for the question is still input, but is plain text field rather than a selector tool. Lastly, the poll needs to include options. For this project, **create 3 options**. One polling option is shown for reference below:

```javascript
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
        }
      ],
```

### Finishing the Shortcut

Finally, you need to create a submit obbject for the view:

```javascript
 submit: {
        type: 'plain_text',
        text: 'Start Poll'
      }
```



## Creating a Poll Shortcut Modal

Copy and paste the following code:

```javascript
app.view('poll_shortcut_modal', async ({ ack, body, view, client }) => {
  await ack();

  const { user } = body;
  const {
    target_conversation,
    poll_question,
    option_1,
    option_2,
    option_3,
  } = view.state.values;

```

This will create a new view, grab the user information, then also the state values of an invoked poll shortcut. You will then need to post a message where the poll is located when a person votes for an option:

```javascript
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
```

 Make sure to recreate the code for the first option for your other two. When you have completed this, the message will be complete.



### Adding Voting Emoji Options

The last thing to do for this project is to add emoji options. Duplicate the following code for all three of your options:

```javascript
 await client.reactions.add({
    channel,
    name: "one",
    timestamp: ts
  });
```



Voila! Your polling app is complete. Feel free to reach out to your mentors for any help or guidance.
