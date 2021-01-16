# Week 3 Livestream

During the week 2 livestream, you learned about Blockkit and modals. This week, you will be introduced to reaction event listeners and threads. This allows you to have your program react when an emoji reaction is added and have your Slack App respond within a given thread.

## 📝 Objectives

### Week 1 Objectives

This week's goals include:

- Learn about the new event listener: `reaction_added`
- Understanding how a Slack App responds in a thread
- Introduction to 3rd party APIs (general, not translator API)

### Livestream Objectives

The livestream for Week 3 is an introduction to 2 new Slack App concepts as well as a basic introduction to 3rd party APIs if you haven't worked within them in the past. The new event listener and respond function are the following: using a new event listener called `reaction_added` that responds when a user adds a reaction (emoji) to a message and threads, allowing your Slack App to send messages in a given thread.

The goal of the livestream is to prepare the students for the HW which focuses specifically on the Google Translate API. Within the Github Learning Lab, students will be putting the 3 concepts together and creating a Slack App that translates a message based on the corresponding language of a flag emoji (ex: spain flag = spanish, japan flag = japanese, etc).

## Event Listeners

In the past, you have probably worked with some simple event listeners like when a message is sent or a specific word. While these are great for making simple Slack Apps that get the job done, there are plenty of more!

Emoji Reactions: https://api.slack.com/events/reaction_added
 ```javascript 
 app.event('reaction_added', async ({ event, client }) => {
 /* Listening for Reaction Emojis */
 });

```

Above is an example of using the new `reaction_added` listener. You should notice it looks the same as a simple message listener and has all the same aspects: `app.event`, `async`, `event`, `client`. When using a `reaction_added` event listener, you'll want to keep track of what emoji the user sent.

```javascript
const { reaction, user, item: { channel, ts } } = event;
```
To do this we will want to create a new constant that saves the `reaction` (btw: channel is the conversation ID it was sent in and ts is the thread... which we'll get into soon!)

Using this concept, we'll be creating a Slack App that responds with the hardcoded translation and integrate the Google Translator API in the homework. To do this we need to introduce a few more concepts...

Some flags don't contain the ID `flag-` which means we won't be able to find the language of EVERY single flag. Luckily, that's no problem! All we need to do is find a way to check if the reaction ID includes `flag-`, if it does then use `.split('-')` and get the flag ID, if not...

*A previous idea was to use `case and break`, can you think of a better way?*

Did you think of it? We need to create a map, almost like a dictionary of corresponding flag codes to country codes with values. 

An example of this:
```javascript
const langMap = {
      mx: ['es', 'Spanish'],
      es: ['es', 'Spanish'],
      ru: ['ru', 'Russian'],
      jp: ['ja', 'Japanese'],
    }
```
Now that we have the language code, all we have to do is create the code to call the API and have the callback logic respond with the translated text in the code, however, you'll learn how to do this in the homework!

For now, we are simply going to hardcode a response:

```
  switch (country) {
    case 'mx':
      translatedText = 'This is in Spanish';
      break;
    case 'jp':
      translatedText = 'This is in Japanese';
      break;
```
In this example, we use `case and break` and simply responsed with a hardcoded string.

## Threads

Having your Slack App post to a thread is quite easy! Whenever you setup your event listener, make sure you keep track of the channel (conversation ID) because it's what we will use to find which channel and thread the Slack App should respond in.

For example, we did this when keeping track of the `reaction_added` by creating a new constant (see above in `event listeners`).
```
await client.chat.postMessage({
      channel,
      thread_ts: ts,
      text: translatedText
    });
```
Using `client.chat.postMessage` we can send a text (in this case the translated text under the string translatedText to a `channel`, which we already set, and a `thread_ts`, which is simply asking which thread in the channel. *How do you suppose we find this?*)

To find the `thread_ts` we will want to repeat the step of finding the `channel`. Using our example of `reaction_added` we once again can pass through `ts` and find which thread/message the user responded to with an emoji. Simple as that!

In the homework, you'll learn a few concepts: first, how to create a Google Developer Account and get yourself started with credentials and API tokens, second, how to actually integrate the Translator library with your NodeJS program, and lastly, how to code the translator API logic.


### 🎉 That's the Week 3 Livestream! Reach out to your mentors if you're having trouble.






