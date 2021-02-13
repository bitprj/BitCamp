# :tent: Bit Project Bitcamp Documentation

### What's in `repo_logistics/`?

* In the `learning_lab` directory, you will find instructions to create your very own [Github Learning Lab](https://lab.github.com/).
* In the `sample-camp` directory, you will find a template for the Bitcamp schedule and the curriculum.
  * This README.md file will give a brief overview of where everything is located.
  * Here is a sample of how the Bitcamp documentation should look [like](https://github.com/bitprj/BitCamp/tree/master/Serverless-Functions)
* In this README.md, you will find the explanation about Github Action and Learning Labs.

---

## :collision: The Github Action

The Github Action can provide you an easier way to work with Github Learning Lab. Below are the steps how to create a good format for Github Action.

### :one: Input and Output

**You must provide:**
- Response files in `/camp-name/homework/responses`
- `course-details.md` file in `/camp-name/homework/course-details.md`

**Github Action produces:**
- Completion response files named `#-complete.md` and `feedback.md`
- A `config.yml` file

Note: "camp-name" is whatever the Bit Camp is called. If we were to create files for a camp named "Serverless-Functions", the file path would be `/Serverless-Functions/homework/responses`.

### :two: Formatting Requirements

The files **must** be named and formatted like so:

#### Response files

File name format: `[Week#].[Step#]-[Step title].md`

> Example: `1.1-Week Step 1.md`

File path: `/Serverless-Functions/homework/responses/[all response files]`

File content: 
* Response files should use **h2 title** at the very beginning of each markdown file. The title will be the same one used in config.yml that is located in `/camp-name/homework/config.yml`
* The **description** of the step should be formatted in **h4**.

> Example:
```md
## Week 1 Step 1

#### This is the description
```

#### `course-details.md` File

File name: `course-details.md`

File path: `/camp-name/homework/course-details.md`

File content: 
* The `course-details.md` file must contain the course name and description.
* The course name must be **formatted with h1** and the course description **must be italicized.**

> Example:

```md
# Course Title

*Course description*
```
Refer [here](https://github.com/emsesc/sample-learninglab) to view the sample containing correctly formatted file names and structures.

### :three: Specifying the Camp name

The Github Action will not run the Python file until a subdirectory (ie. Serverless-Functions) is specified. To do so, open the `learninglabauto.py` file under `scripts/` folder and edit the file's `subdir` value.

**Before:**
```py
subdir = ""

if subdir == "":
  exit()
```

**After:**
```py
subdir = "[Insert your camp name. Ex: Serverless-Functions]"

if subdir == "":
  exit()
```

### :four: Finishing up

Once the `learninglabauto.py` file and the other files are committed, the Github Action should trigger and run.

Watch this video for a walkthrough:
[![Watch the video](https://cdn.loom.com/sessions/thumbnails/d21df3bc8776488b81c6682449e81776-with-play.gif)](https://www.loom.com/share/d21df3bc8776488b81c6682449e81776)
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

***`sample-camp/` file will be linked for your reference***

### :book: [The root README.md file](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/README.md)

**What is it?**

This contains a general overview of the entire camp and quick summaries of each week, which is located under your camp's [subdirectory](https://github.com/emsesc/BitCamp/tree/sample-camp/repo_logistics/sample-camp). 

**Purpose:** This can help open-source contributors to understand what the camp's goals are and what the curriculum contains. Make sure to make it clear and be as detailed as possible.



### :file_folder: [The `homework/` folder](https://github.com/emsesc/BitCamp/tree/sample-camp/repo_logistics/homework) 

**What is it?**

This is the `homework/` in your camp's [subdirectory](https://github.com/emsesc/BitCamp/tree/sample-camp/repo_logistics/sample-camp). This contains all of the files needed to create your camp's Learning Lab.

**Purpose:** To keep all files related to the camp in one place, please place all files under this subdirectory for easy access.

*Refer to the [`learning_lab`](https://github.com/bitprj/BitCamp/tree/master/repo_logistics/learning_lab) subdirectory to go over the file structure in this markdown file.

### :file_folder: [Week Folders](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp)

**What is it?**

These are [subdirectories](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp) that organize the content by weeks. Create as many as you need accordingly to the camp's weeks.

**Purpose:** Each directory contain the week's README.md (individual week description), livestream, and homework.

### :open_file_folder: [Inside the Week Folders](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/week1)

**What is it?**

These consist of three components: code, videos, and the README.md (individual week description).

* **`code`**: this contains the **code** you will use in the livestream.
* **`videos`**: this contains the **video recordings** of the livestream.
* [**`README.md`**](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/week1/README.md): this is the **individual week description**, which should be differentiated from the root [README.md file](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/README.md)
  * **Note:** some content from the root [README.md file](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/README.md) is repeated in the [individual week description](https://github.com/emsesc/BitCamp/blob/sample-camp/repo_logistics/sample-camp/week1/README.md) for clarification.
  
