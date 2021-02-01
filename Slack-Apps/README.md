# Slack Apps 💬

Slack Apps are powerful extensions for Slack, a channel-based messaging platform widely used in the industry like IBM, Amazon, and more. These Apps allow users in a workspace to interact, connect, communicate, and work for efficently.

## The Goal 🥅
**Who?** Built with the audience of college and high school students that have basic knowledge of JavaScript, including NodeJS, who are interested in exploring the use of APIs in the industry.

**What?** Taught through weekly livestreams by Slack engineers & student mentors along with an interactive Github Learning Lab that introduces additional skills based on the concepts taught about the Slack API.

**How?** Students will learn a new skill relating to Slack Apps every week (examples: responding to messages, interactive UIs, external APIs) all with the end goal of having students build their own fully-functional Slack App using the skills they learned.

**When?** 

*Starting out:* Week 1 consists of an introduction to the Slack API, BoltJS framework, and general knowledge of setting up an IDE and all necessary extensions to get started.

*Last week:* Week 4 uses all the previous skills taught in Weeks 1-3 to use the Github API with the goal of creating a Slack App that responds (with a message, image, notification, etc) to changes within a given repository.

**Where?** Students will use VSCode, an IDE created by Microsoft, along with the Slack API, JavaScript (NodeJS), Bolt JS Framework, and a Google Developer Account to use 3rd party APIs.


###  **Week 1**
***

### Livestream

In the Livestream Portion of Week 1, students will be introduced to the basics of the Slack API, including what a slack app is, how it is used in the industry, and the basics of creating their first app. During the livestream for this week, topics such as the Bolt Framework ([here](https://slack.dev/bolt-js/tutorial/getting-started "Bolt Framework")), Node JS, permissions/scopes, and a brief introduction of events and listeners will be discussed. As well, a basic slack app will be created that simply listens to a message in a specific channel, and responds to the user with a given message.

### Homework

In the Homework Portion of Week 1, students will continue to advance the skills taught during the livestream through a guided Github Learning Lab. Students will browse the Slack API documentation, experiment with events and listeners, assign permissions/scopes, and further learn response functions like message() and say(). Doing so, they will have a final assignment of creating a similar slack app (to the livestream) that responds to an event rather than a message.

**Learning Objectives**

- Introduction to the Slack API (https://api.slack.com).
- Using Bolt Framework with NodeJS (https://github.com/slackapi/bolt-js)
- Creating a Slack App that uses `say()` and responds to a message.

###  ❓ How will this help students?

In Week 1, students will work towards the end goal of creating their first Slack App by being introduced to the skills necessary to create one (reading documentation, learning about NodeJS, etc). During the Livestream, students will be able to ask questions refering to their current task.

### **Week 2**
***

### Livestream

In the Livestream Portion of Week 2, students will work with new topics like shortcuts, modals, and BlockKit. Students will use skills from the previous week such as scopes/permissions and listeners to further progress their understanding. During the livestream for this week, students will build a polling Slack App using a shortcut-triggered modal (using a shortcut listener and poll shortcut from [api.slack.com](http//api.slack.com "Slack API")), BlockKit to accept user input/view building, and a ViewSubmission listener to post the poll and receive emoji responses.

### Homework

In the Homework Portion of Week 2, students will continue to advance the skills taught during the livestream through a guided Github Learning Lab. Students will focus on BlockKit (found [here](https://api.slack.com/block-kit "here")) and explore the UI framework by creating more complicated messages that change and work with user input. As well, students will strengthen their understanding of modals by experimenting with different modal blocks and views. At the end of the week, students will be tasked to create a simple Slack App that uses the skills learned in week 2 (shortcuts, modals, and BlockKit) in a creative way to recieve and respond to user input.

**Learning Objectives**

- Introduction to BlockKit (https://api.slack.com/block-kit).
- Using Modals & Views (https://api.slack.com/surfaces/modals).
- Creating a Polling Slack App that uses a `view` and a `modal`.

###  ❓ How will this help students?

In Week 2, students will work on developing skills they worked on in the previous week and learn about new functions of the Slack API like BlockKit, Modals, and Views. During the Livestream, students will be able to ask questions refering to their current task.

### **Week 3**
***

### Livestream

In the Livestream Portion of Week 3, students will be introduced to third party API integration. This week, students will start off by using the Google Translate API. Students will first learn a few more actions including how to respond to emoji reactions and how to set Slack Apps to reply to a thread. Using these actions, students will create a Slack App that responds to a flag (emoji reaction) and posts a message in a thread with the language of given flag. The livestream for this week will hardcode the callback response to prepare students to integrate the API for homework.

### Homework

In the Homework Portion of Week 3, students will continue to advance the skills taught during the livestream through a guided Github Learning Lab. Students will begin the process of integrating the google translate API (found [here](https://cloud.google.com/translate/docs/ "here")) by learning how to create an account, obtain an API key/token, and finally, code the callback logic that sends a message and recieves a translated response back. Students will create an app, building on to the livestream, that responds to a flag (emoji reaction) + phrase and will return the translated phrase in a thread.

**Learning Objectives**

- Introduction to 3rd Party APIs (https://cloud.google.com/translate/docs/)
- Using Emoji Reactions and responding in Threads.
- Creating a Translation Slack App that responds to a Flag Emoji.

###  ❓ How will this help students?

In Week 3, students will be introduced to their first 3rd Party API, Google Translate. Using the Google Translate API, students will create a Slack App that responds to a flag emoji and posts the translated text in a thread. During the Livestream, students will be able to ask questions refering to their current task.

### **Week 4**

***

### Livestream

The Livestream Portion of Week 4 involves webhooks and the Express framework.  Students will learn about the usecases for a webhook, as well as how Express can be used to receive webhook payloads. The livestream covers GitHub webhooks, namely demonstrating the process of setting up a webhook and receiving a payload. The mentor leading the stream teaches these principles through a sample project: listening for a repository to be starred, then messaging a Slack channel when the event occurs.

### Homework

The Homework Portion of Week 4 is a review of the topics that are covered in the livestream. Students will follow a GitHub Learning Lab that outlines the basics of coding using webhooks. There are issues for creating GET and POST methods in Express and creating up a GitHub webhook. The last issue is a guided project similar to the one demonstrated in the livestream. Overall, the purpose of the homework this week is to expose students to the versatility of webhooks. 

**Learning Objectives**

- Introducing students to webhooks.
  - Explaining the benefits and usecases for webhooks (https://zapier.com/blog/what-are-webhooks/).
  - Teaching students how to use a webhook payload.
- Introducing students to Express and framworks.
  - Teaching students how to get a webhook payload.
- Creating two apps that use the GitHub webhook service along with Express to post messages when an event occurs.



###  ❓ How will this help students?

Webhooks are extremely useful tools when building apps of any kind. The livestream and homework for Week 4 will emphasize exploration of webhooks. Learning how to use a webhook will help students brainstorm ideas for their personal projects. During the livestream, students will be able to ask questions refering to their current task. The homework will additionally provide a step-by-step reference for the basics of creating a webhook.
