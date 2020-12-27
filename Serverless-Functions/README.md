# Bitcamp Serverless ⚡

Serverless architectures offer greater scalability, more flexibility, and quicker time to release, all at a reduced cost. Functions is also a great solution for processing bulk data, integrating systems, working with the internet-of-things (IoT), and building simple APIs and micro-services.

## The Goal 🥅
**Who?** Built with the audience of college and high school students that have minimal to advanced coding experience in mind. Most do not have experience with APIs with serverless architectures.

**What?** Concise and interactive Github Learning Lab that introduces and develops skills related to serverless architectures with [Microsoft Azure Functions](https://azure.microsoft.com/en-us/services/functions/)

**How?** Students gain experience through building a complete web app with a frontend (HTML, CSS, JS) and backend (Azure Functions, NodeJS). The web app's input is a picture, and it analzyes the image to display emotion data.

> Example of [web app](https://express10ns-1.emilychen10.repl.co/) *Note: Azure Functions may not be always enabled*

**When?** 
* *Starting out:* Week 0 consists of an introductory JS project and Week 1 assists students in setting up with VSCode, a basic Azure Function, and Github.
* *The project:* Week 2 (backend) and Week 3 (frontend) is when students begin building their "Emotion Detector"

**Where?** Tools used include VScode, Github, Azure Static Web Apps, Azure Functions, and Microsoft Cognitive Services (Face API).

### Project Description
4-week course on using Azure Functions, Javascript, and External APIs.

### ❗ Prerequisites for BitCamp Serverless (Week 0)

The purpose of Week 0 is to **review or teach** skills required for success with the curriculum. Building a JS Clock requires students to understand the basics of JS, templating in JS, and integrating HTML, CSS, and JS. Week 1 will help students set up tools needed to build the project!
> Note that these are skills needed mainly for developing a frontend. Students will be introduced to APIs, Functions, and making requests later in the course during Week 2 and 3.

### **Week 1**

📚 **Summary**

Students will **learn about and set up tools** needed for the completion of the "Emotion Reader" project. To show their mastery of these skills they will complete a simple HTTP Trigger function, commit files, and work with VSCode.

![http trigger](https://user-images.githubusercontent.com/69332964/102018451-50a09c80-3d3b-11eb-8a02-0f1d06a5ca61.gif) <br /> *Example of the simple HTTP trigger students will make with an Azure Function, which takes in a parameter of "name" and outputs the time.*

![azure console](https://user-images.githubusercontent.com/69332964/102018608-429f4b80-3d3c-11eb-970f-aeacea8f47f7.png)
*Behind the scenes of the Azure console students work with.*

**Learning Objectives**
- Create and deploy an Azure Function
- Intro to using beginner JS
- Start working on request function

Setting Up 👷
- Download IDE (VS Code)
- Sign up for Azure
- Commit a Readme.md (how to commit files on github)

Intro to Javascript 💻
- Learning fundamentals
- Making a digital clock

Intro to Functions 🧰
- Create and deploy an HTTP trigger Azure Function that output the current time + date

### **Week 2**

📚 **Summary**

Students are now **starting their "Emotion Reader" web app** with coding their HTTP Trigger Azure Function and creating the Face API resource. This trigger parses an image, makes a request to the Face API, and returns the emotion data in the body. Lastly, they will **test their function** with Postman. <br />
![postman](https://user-images.githubusercontent.com/69332964/102019491-e808ee00-3d41-11eb-8101-fb4c30203a9a.gif)
<br />*By the end of the week, students will be able to send a request to their HTTP Trigger on Postman and receive emotion data in JSON.*

**Learning Objectives**
- Parsing multipart data + Outputting in JSON
- Installing npm dependencies
- Making HTTP requests with fetch
- Working with the Face API + Reading its documentation
- Calling and Testing API Endpoints ft. Postman

### **Week 3**

:books: **Summary**

During Week 3, students are finishing up their "Emotion Reader" project by coding the frontend with HTML, CSS, and JS. They will code and style the page; integrate JS that makes a POST request to the HTTP Trigger they created in Week 2 and displays emotion data. By the time their project is finished, students will have experience working with APIs, Azure Functions, and connecting frontend to backend.<br />
![Express10ns](https://user-images.githubusercontent.com/69332964/102021511-42a84700-3d4e-11eb-9ff5-ddbf467fc768.gif)
<br />*Students will have a working web app that takes a face image as an input, makes a request to the HTTP Trigger, and displays emotion data.*

**Learning Objectives**
- Calling Azure Functions
- Learning HTML/CSS
- Uploading Images with Forms
- Completing the working app end to end!
