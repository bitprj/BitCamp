# Bitcamp NoSQL :leaves:

Data is all around us and knowing how to use and manipulate databases is an increasingly important skill in today's technological world. NoSQL platforms are ideal to search, create, and analyze data and make applications with databases.

## The Goal 🥅
**Who?** Built with the audience of college and high school students that have minimal to advanced coding experience in mind. Most do not have experience with NoSQL databases and deploying web applications.

**What?** Concise and interactive Github Learning Lab that introduces and develops skills related to NoSQL databases with [MongoDB](https://www.mongodb.com/)

**How?** Students gain experience through building a complete web app with a frontend (HTML, CSS, JS, Atlas Realms) and backend (MongoDB, Azure Services, NodeJS). The application utilizes machine learning, an external API, and NoSQL databases to recommend products to users based on the contents in an uploaded image (objects and text within the picture). Authentication is used to incorporate the database, which stores a history of recommendations with a corresponding user.

**When?** 
* *Starting out:* Week 1 will ease students into the course by introducing them to MongoDB Compass and basic concepts related to NoSQL databases. They will also set up necessary tools (GitHub and Git Bash).
* *The project:* Weeks 2 through 4 will focus on building the Product Recommendation Engine, walking through 3 basic steps: coding the backend Azure Function, deploying the frontend on Atlas Realms, and finally implementing the MongoDB database and authentication.

**Where?** Tools used include Github, Git Bash, Atlas Realms, Azure Services, and MongoDB (Compass) Databases.

### Project Description
4-week course on using MongoDB, Azure Services, Atlas Realms, and Deploying a Webapp.

### **Week 1**
***

📚 **Summary**

Students are able to navigate [MongoDB Compass](https://www.mongodb.com/products/compass) and understand how GitHub/Git Bash can be used effectively for developing applications after this week. They will experiment with and create sample datasets that reinforce understanding of how NoSQL databases store information and are structured.

**Learning Objectives**
* How to Use GitHub (commits, cloning, branches etc.) and Git Bash
* MongoDB Compass: access and create your databases
* Basic MongoDB terminology
* The basics of JSON
* Installing an IDE that supports JS

### **Week 2**
***

📚 **Summary**

Students will have a working Azure Function that makes two requests (one to the [Computer Vision Machine Learning API](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/) and another to the [Amazon API](https://www.notion.so/Using-Machine-Learning-APIs-to-Help-Users-Find-Product-Recommendations-af7bdca92f1f424298631a4d4e5cedb5#4c80144a670f4c2f8551e90a0cf9314a)) at the end of the week. Their function should take an image as an input and return product recommendations in JSON as an output.

**Learning Objectives**

* Install npm dependencies
* Parse an image
* Understand GET/POST HTTP requests
* Using APIs and reading documentation

### **Week 3**
***

:books: **Summary**

At this point, students will have a backend and receives and returns information. After Week 3, they should have a deployed web app frontend on Atlas Realms that connects back to front. The frontend will send requests to the Azure Function, which is done with HTML/CSS and JS. They are another step closer to having a complete Product Rec Engine!

**Learning Objectives**

* Deploy Web App on Atlas Realms
* Use HTML/CSS and JS to create frontend
* Call Azure Function previously created (POST request)

### **Week 4**
***

:books: **Summary**

This is the last week of the course, and students will finish up the Proudct Rec Web App by adding authentication and implementing a MongoDB database. The database stores the logged in user's past recommendations. The next time they use the auth system on the application to log in, they can view and retrieve what they've been previously recommended.

**Learning Objectives**

* Implement a MongoDB database into a Web App
* Add user authentication with Atlas Realms
* Store and retrieve data from a NoSQL database
