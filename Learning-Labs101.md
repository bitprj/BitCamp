# 🛠 Working With Github Learning Labs 

*The `config.yml` file should be written in this order. Refer to a complete `config.yml` file [here](https://github.com/emsesc/azure-functions-course/blob/master/config.yml)!*

## :pencil: **The Basic Sections of the YAML file**

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

### 3. `template: `

**What is it?**

**It specifies the template repository that is created for the student to use during the Learning Lab and the repository that houses the code for your Learning Lab.** In the example below, when someone begins the Learning Lab, a repo named "bit-camp-learning-lab-test" will be created. The repo, "azure-functions-template," is where the config.yml file, course-details.md, and responses folder are. This repo is *not* created for the student and is only for developing the course.

**Syntax:**

```yaml
template:
  name: bit-camp-learning-lab-test
  repo: azure-functions-template
```

### 4. `before: `

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

### 5. `steps: `

**What is it?**

This is the meat of the Learning Lab - the logic that controls when issues are closed, when responses are commented, and when to move on. The syntax requires breaking down to explain properly, so refer to the next section for a complete description.

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

Your first step in `steps: ` should be something along the lines of this:

