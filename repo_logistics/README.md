# :tent: Bit Project Bitcamp Documentation

### What's in `repo_logistics/`?

* In the `sample-camp` directory, you will find a template subdirectory for how each Bitcamp documentation should be structured.
  * This README.md file will give a brief overview of where everything is located.
  * If you need a reference to a complete Bitcamp documentation, click [here](https://github.com/bitprj/BitCamp/tree/master/Serverless-Functions)
* In the `learning_lab` directory, you will find instructions to create your very own Github Learning Lab from your curriculum.
* In this README.md, learn about the Github Action that creates Learning Labs

---

## :pencil2: Creating Your Own Cabin

Use the template to automatically sync your instruction files with a fully functional course. Refer to the below documentation for formatting requirements and how it works:

### :one: Use the Premade Template

#### Create the template
We have a basic cabin (course) structure set up for you. Click [here](https://github.com/bitprj/cabin/generate) to generate a repo with *all* the neccessary files, file structure, and template responses that will help you format your course.

#### Secrets *shhhh*
Add some respository secrets to the template repo you just created so the Github Action can sync your files. On your repository, go to `Settings` --> `Secrets` and then click `New Repository Secret`. Add an `EMAIL` secret containing your email, and `USERNAME` secret containing your Github username.

**While we do have most things set up for you, here's what you do need to provide:**
- Response files in `/.bit/responses`
- `course-details.md` file in `/.bit/course-details.md`

**Here's what the template automatically updates for you as you commit to the repo:**
- Completion response files named `#-complete.md` and `feedback.md`
- A `config.yml` file

### :two: Formatting Requirements

In order for the template to successfully sync and parse content, the files **must** be named and formatted like so:

#### :file_folder: [Response files](https://github.com/bitprj/cabin/tree/main/.bit/responses)

File name format: `[Week#].[Step#]-[Step title].md`

> Example: `1.1-Week Step 1.md`

File path: `/.bit/responses/[all response files]`

File content:
* Response files should begin with a **markdown table**
  * Place files here that the student should **include in the pull request** to move on to the next step.
  * Ex: If you place `index.js` in the table for the first step of Week 1, a student will need to merge a pull request containing the file `index.js` in order for the bot to comment the second step of Week 2.
  * Also, place the **week, step number, and step name** in this table.
* The **title** should be formatted with **h2**.
* The **description** of the step should be placed directly under formatted in **h3**.

> Example:
```md
---
files: index.html, js/config.js, README.md
week: 1
step: 1
name: Week 1 Step 1
---

## Week 1 Step 1

### This is the description
```

**Note: Pay special attention to how the files are spaced and where slashes are put.**

#### :file_folder: [`course-details.md` File](https://github.com/bitprj/cabin/blob/main/.bit/course-details.md)

File name: `course-details.md`

File path: `/.bit/course-details.md`

File content: 
* The `course-details.md` file must contain the course name and description.
* The course name must be **formatted with h1** and the course description **must be italicized.**

> Example:

```md
# Course Title

*Course description*
```

### :three: Errors, Check-marks, and Success?

1. Either use the template response files or delete them all of them and place your own. (Remember to format them correctly!)
2. Monitor the Github Action.

If you have this green checkmark on **your root directory as shown here,** you are good to go! If you have a red x-mark, you have some editing to do on your response or course files.
![checkmark](https://user-images.githubusercontent.com/69332964/107892038-74758f80-6ef0-11eb-9c29-dcd47b30d9c4.png)

Whether or not you have a check mark or x-mark, double check the status of your commit in "Actions."
![image](https://user-images.githubusercontent.com/69332964/107892815-8f96ce00-6ef5-11eb-9b84-684aeb5f00f3.png)

Click on the commit --> click "build" --> click the drop down arrows and read the logs to determine the issue with your files.
![image](https://user-images.githubusercontent.com/69332964/107893016-af7ac180-6ef6-11eb-91e9-d5b963abb598.png)


### :four: Finalizing the Course

1. Make your repository a "template" so students can easily click a button to start their course.
2. Delete `.bit/.progress` if it is in your repository
3. Make sure `.bit/.camp` contains this default setting: `{"count" : "0", "prcount" : "0", "issue" : "1"}`

### Need a visual walkthough? Watch these two videos to learn how to set up your course and how students will use it.

[![Watch the video](https://cdn.loom.com/sessions/thumbnails/57a96ffe6bdb4871963fb13fda57f654-with-play.gif)](https://www.loom.com/share/57a96ffe6bdb4871963fb13fda57f654)
[![Watch the video](https://cdn.loom.com/sessions/thumbnails/726302a1dd1a45e7b87eae15d864fa3c-with-play.gif)](https://www.loom.com/share/726302a1dd1a45e7b87eae15d864fa3c)
---

## :deciduous_tree: Documenting Bitcamp Curriculum (`sample-camp/`)

Maintaining a consistent Bitcamp Curriculum documentation throughout all Bitcamps makes it easier for open-source contributors to understand how everything is structured. This section will go over where everything is located and provide basic descriptions to clarify each directory's purpose.

**Filesystem Structure:**

* `sample-camp`
  * `homework/`

    * `images/`
    * `responses/`
    * `solutions/`
    * `config.yml`
    * `course-details.md`
    * `README.md`

  * `week1/`

    * `code/`
    * `videos/`

    * `README.md`

  * `week2/`

    * `code/`
    * `videos/`

    * `README.md`

  * `week3/`

    * `code/`
    * `videos/`

    * `README.md`
 * `...`
 * `README.md`

***Throughout this walkthrough, the corresponding files/directories within `sample-camp/` will be linked for your reference***

### :book: [The root README.md file](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/README.md)

**What is it?**

This is the general README.md file under your camp's [subdirectory](https://github.com/emsesc/BitCamp/tree/sample-camp/repo_logistics/sample-camp). This contains a general overview of the entire camp and quick summaries of each week.

**Purpose:** This is for open-source contributors to understand what the camp's goals are and what the curriculum contains. This should NOT be as detailed as individual week descriptions. Be as clear and concise as possible.



### :file_folder: [The `homework/` folder](https://github.com/emsesc/BitCamp/tree/sample-camp/repo_logistics/homework) 

**What is it?**

This is the `homework/` in your camp's [subdirectory](https://github.com/emsesc/BitCamp/tree/sample-camp/repo_logistics/sample-camp). This contains all of the files needed to create your camp's Learning Lab.

**Purpose:** To easily sync response files and other Learning Lab materials, placing all files under this subdirectory makes your life easier. This also keeps all files related to the camp in one place for easy access.

*We will not go over the file structure in this markdown file, so refer to the [`learning_lab`](https://github.com/bitprj/BitCamp/tree/master/repo_logistics/learning_lab) subdirectory for documentation on Learning Lab components.*

### :file_folder: [Week Folders](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp)

**What is it?**

These are directories within the camp [subdirectory](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp) that organize the content by weeks. Create as many as you need accordingly to the camp's weeks.

**Purpose:** These directories each contain the week's README.md (individual week description), livestream, and homework.

### :open_file_folder: [Inside the Week Folders](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/week1)

**What is it?**

Inside the Week Directories, there are three components: code, videos, and the README.md (individual week description).

* **`code`**: this contains the **code** you will use in the livestream.
* **`videos`**: this contains the **video recordings** of the livestream.
* [**`README.md`**](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/week1/README.md): this is the **individual week description**, which should be differentiated from the root [README.md file](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/README.md)
  * **Note:** some content from the root [README.md file](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/README.md) is repeated in the [individual week description](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/week1/README.md) for clarification.
  
