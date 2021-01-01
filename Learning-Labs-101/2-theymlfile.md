# 🛠 Working With Github Learning Labs: The YAML File

## :books: **Resources**
* Github's very own [Learning Lab](https://lab.github.com/githubtraining/write-a-learning-lab-course) that goes over how to create Learning Labs
* Github [Learning Lab documentation](https://lab.github.com/docs). Specifically look at "3. Writing a course" - this includes more detailed descriptions of the wide range of customizability Learning Labs hold.
* Links to corresponding documentation pages are also provided accordingly throughout.

## :question: **What is the `config.yml` file for?**
*[Introduction to the config.yml file Video by Github](https://www.youtube.com/watch?v=HL8MdBsFaF4)*
> "With every Github Learning Lab course there is a config.yml file that drives the logic and defines the steps to take within the course. **The majority of the time spent may be dedicated to this file, so understanding all of the pieces and how they fit together is pretty important..."** *- Github*

## :pencil: **The Basic Sections of the YAML file**

*The `config.yml` file should be written in this order. Refer to a complete `config.yml` file [here](https://github.com/bitprj/azure-functions-course/blob/master/config.yml)!*
**This md file is targeted specifically towards BitProject's Bit Camp Learning Labs.**

### 1. `title: `

**What is it?**

The title of the Github Learning Lab that appears like this below, so make it good!
![title](https://user-images.githubusercontent.com/69332964/103419870-dbb6ca80-4b62-11eb-809b-b3171d742bd9.png)

**Syntax:**

```yaml
title: Creating an Emotion Reader with Azure (Face API and HTTP Triggers)`
```

### 2. `description: >-`

**What is it?**

Description of the course repository. Not as important since the course-details.md file will contain the actual Course Description that appears on the Github Learning Lab page.

**Syntax:**

```yaml
description: >-
  This learning lab course is part of Bit Project's 8 Week Program. By the end
  of the course, students will deploy a song recommendation web app using Azure
  Static Web Apps.
```

### 3. [`template: `](https://lab.github.com/docs/template-block)

**What is it?**

**It specifies the template repository that is created for the student to use during the Learning Lab and the repository that should be copied into the learner's repository.** In the example below, when someone begins the Learning Lab, a repo named "bit-camp-learning-lab-test" will be created. The repo, "azure-functions-template," is the repository that is copied into the student's new "bit-camp-learning-lab-test" repo.

**Syntax:**

```yaml
template:
  name: bit-camp-learning-lab-test
  repo: azure-functions-template
```

### 4. [`before: `](https://lab.github.com/docs/before-block)

:sparkles: ***Optional*** :sparkles: 

**What is it?**

This specifies the first thing that should happen when the student begins the Learning Lab, **usually like an introduction**. **Issues are like sections (ie. Week 1 is one issue)**, so you would first create a new issue (`type: create Issue`; this will be your first "section"). The `title` specifies the what the issue is called, and `body` specifies the response file - what the issue should display as a comment.

***Note:*** 
* Response files are markdown files stored in the responses/ directory within your Learning Lab repository
* This issue is NOT part of the general Learning Lab. This is an introductory step that might be a prerequisite or an introduction to the Lab.

![image](https://user-images.githubusercontent.com/69332964/103420484-7f08df00-4b65-11eb-900a-6d8faf2b1b8e.png)
<br />*As seen here, `Prerequisite` does not appear as a Course step*

**Syntax:**

```yaml
before:
  - type: createIssue
    title: Prerequisite
    body: 00-prerequisite.md
```

### 5. [`steps: `](https://lab.github.com/docs/steps-block)

**What is it?**

This is the meat of the Learning Lab - the logic that controls when issues are closed, when responses are commented, and when to move on. The syntax requires breaking down to explain properly, so refer to the [next section](https://github.com/emsesc/BitCamp/blob/master/Learning-Labs101.md#apple-the-core-of-the-learning-lab---steps-) for a complete description.

**Syntax:**

```yaml
steps: 
[insert all your steps]
```

1. Creating a new section (issue) after the completion of another (closing an issue and opening a new one)
```yaml
  - title: 'Week 1: Downloading an IDE'
    description: Installing Visual Studio Code.
    event: issues.closed
    link: '{{ repoUrl }}/issues/1'
    actions:
      - type: respond
        with: 00-response.md
        issue: 1
      - type: createIssue
        title: Week 1
        body: 1.1-ide.md
 ```

2. Moving on within the same issue (creating new comments)
```yaml
  - title: 'Week 1: Learning to Use Github'
    description: Understanding how to use GitHub.
    event: push
    link: '{{ repoUrl }}/issues/1'
    actions:
      - type: respond
        with: 1.4-feedback.md
```

### 6. `tags: `

**What is it?**

Allows Github Learning Lab users to find your Lab easier. The tags allow your Lab to be grouped with other similar Learning Labs.
![tags](https://user-images.githubusercontent.com/69332964/103420623-3bfb3b80-4b66-11eb-8a45-db30e22a0ce0.png)

**Syntax:**

```yaml
tags:
  - Azure
  - Azure Functions
  - Bit Project
  - JavaScript
```
<br />

## :apple: **The Core of the Learning Lab - `steps: `**

*This part is crucial when making your Learning Lab actually work... It details when issues should be opened, when they should be closed, and when to move forward in the lab.*

### Breaking down `steps: `

**Before we take a look at how an entire `steps: ` section should be written and how it works together, let's dive first into each specific option.**

**1. `title: ` and `description: `**

These are self explanatory and make up the metadata of each step. Provide a good and consistent title along with a concise description.

**2. `event: `**

This option specifies when this step should be triggered or executed using a webhook event from Github. If you set it as `event: issues.closed`, everything under `actions: ` will occur when an issue is closed. Find more webhook events [here](https://lab.github.com/docs/events).

**3. `link: `**

Step links allow you to direct learners to a location that contains instructions to continue the Learning Lab. `link: '{{ repoUrl }}/issues/2'` would direct the learner to the second issue created in the repository. A more complicated usage example is linked [here](https://lab.github.com/docs/links)

**4. `actions: `**

This is arguably the most important part of `steps:`. There are three main actions we will go over: `respond`, `createIssue`, and `closeIssue`. As always, more detailed documentation can be found [here](https://lab.github.com/docs/using-actions).

* `respond`

`respond` requires the `with` option that dictates which response file to comment on the issue. You would use this option when you want to comment new instructions for the learner.

```yaml
- type: respond
  with: my-response.md
```

* `createIssue`

`createIssue` requires two options: `title` and `body`. `title` is the title of the issue and `body` is the description of the issue. Use this option when you need a new "section" within your Learning Lab. (Ex: Week 1, Week 2)

```yaml
- type: createIssue
  title: New issue
  body: theissue.md
```

* `closeIssue`

`closeIssue` requires only one option: `issue`. Use this option when you want to close off a "section." For example, if I am ending Week 1 and starting Week 2, I would close out the corresponding issue of Week 1.

```yaml
- type: closeIssue
  issue: 2
```

**Now, let's see how all the options work together to develop the logic of the Learning Lab.**

Your first step in `steps: ` should be something along the lines of this:
```yaml
  - title: 'Week 1: Downloading an IDE'
    description: Installing Visual Studio Code.
    event: issues.closed
    link: '{{ repoUrl }}/issues/2'
    actions:
      - type: respond
        with: 00-response.md
        issue: 1
      - type: createIssue
        title: Week 1
        body: 1.1-ide.md
 ```
 :arrow_up: This opens up issue #2, which is Week 1, **when the issue #1, which was opened by `before: `, is closed.** `event: issues.closed` specifies that when the `Prerequisite` issue (see in `before: ` section) is closed by the learner, the Learning Lab Bot responds with a comment containing the `00-response.md`file and creates the new issue (Week 1). *Note: The purpose of the response file is to notify that the first issue was closed and the learner should move on to Week 1 (issue #2)*
 
 Another comment is written containing the file `1.1-ide.md`, which is specified in `body:`.

:bulb: The `link:` directs the learner to the new issue that was created: Week 1. Now that the new section has been created, we can move inside the issue like this:

```yaml
  - title: 'Week 1: Downloading an IDE'
    description: Installing Visual Studio Code.
    event: issue_comment.created
    link: '{{ repoUrl }}/issues/2'
    actions:
      - type: respond
        with: 1.2-azure.md
```
:arrow_up: This step executes or triggers when an issue comment is created (`event: issue_comment.created`) and responds with another new comment containing `1.2-azure.md`. 

### Let's say that we're done with Week 1. How do we create a new section?

```yaml
  - title: 'Week 1: Learning to Use Github'
    description: Understanding how to use GitHub.
    event: push
    link: '{{ repoUrl }}/issues/2'
    actions:
      - type: respond
        with: 01-complete.md
        issue: 2
      - type: createIssue
        title: Week 2
        body: 2.1-parsing.md
      - type: closeIssue
        issue: 2
```
:arrow_up: Include the last step of Week 1, including the response trigger (in this case, it's when the learner commits something) and the response file. In the actions, also include creating a new issue (#3) and closing the old issue (#2). **Keep on repeating this pattern until you're ready to end the Learning Lab!**

### **Finishing up the Learning Lab**

:arrow_down: To close it up, you use the same code as above, except you don't create another issue.
```yaml
  - title: 'Final Project: Lightning Talk'
    description: Preparing your lightning talk.
    event: issue_comment.created
    actions:
      - type: respond
        with: 04-complete.md
        issue: 5
      - type: closeIssue
        issue: 5
```
If you correctly set up your steps, they should appear on the course page like this:
![image](https://user-images.githubusercontent.com/69332964/103423853-1d517080-4b77-11eb-98a9-476d483cc2c0.png)

### Clarification of Weeks and Issues
* Prerequisite = Issue #1
* Week 1 = Issue #2
* Week 2 = Issue #3

*...and so on*

### See the issues/comments in action [here](https://github.com/emsesc/bit-camp-learning-lab-test/issues?q=is%3Aissue+is%3Aclosed)
