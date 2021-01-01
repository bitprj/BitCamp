# 🛠 Working With Github Learning Labs: **The Github Repos**

*The Main Github repo for your Learning Lab contains files that contains configuration, course details, and response files that house the actual curriculum content. Refer to an example repository [here](https://github.com/bitprj/azure-functions-course).*

## :file_folder: Components of the Main Repository

![image](https://user-images.githubusercontent.com/69332964/103431253-5ac7f500-4b9b-11eb-8e63-8d83d4ee6d6d.png)

### 1. `images/`

Place in this directory any images you will include in your MD files for the curriculum responses. [Here](https://gist.github.com/vinkla/dca76249ba6b73c5dd66a4e986df4c8d) is another option that you can use to upload images easily to Github and reference them with markdown.

### 2. `responses/`

Place in this directory all markdown responses that learners will go through to complete the Learning Lab. Examples of what these files are like are [here](https://gist.github.com/vinkla/dca76249ba6b73c5dd66a4e986df4c8d). These files should have a few basic parts:
* Title, including section (Week #) and the topic of the page
* Curriculum content
* Instructions for how to move on (ie. Commit a file to move on!)

### 3. `README.md`

This README file should be titled with the course name (header 1) and contain a short description of the Learning Lab in the body (one sentence).

### 4. `config.yml`

This YAML file contains code for configuring the Learning Lab in terms of when to continue to the next step (events), what response file to comment, and when to open a new issue. For further instructions on how the file should be written, head to the dedicated YAML page in this tutorial. Example is [here](https://github.com/bitprj/azure-functions-course/blob/master/config.yml).

### 5. `course-details.md`

This markdown file is what appears on the Learning Lab description on lab.github.com:
![image](https://user-images.githubusercontent.com/69332964/103431296-cf029880-4b9b-11eb-9701-cb259905cd47.png)

Follow the format linked [here](https://github.com/bitprj/azure-functions-course/blob/master/course-details.md).

## :paperclip: The Template Repository
*This repository is a template that the Learning Lab Bot copies into the learner's own repository. This is different from the main repo, as that one contained all the content required to create the Learning Lab.*

### [Example](https://github.com/bitprj/azure-functions-template) template repo from the Serverless Bitcamp.
If you want the students to just start out with an empty repository, you still need to create a template repo. However, all you need to put inside is a README.md file.

> Tip: You'll need this for the next step - the YAML file. (`template:` in the config.yml file)
