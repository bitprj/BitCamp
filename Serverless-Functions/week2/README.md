# Bitcamp-Serverless
## **Week 2**

Last week, you should've learned the basics of how to create an Azure Function, along with the basics of triggers and bindings.

### 📚 **Summary**

Students are now **starting their "Emotion Reader" web app** with coding their HTTP Trigger Azure Function and creating the Face API resource. This trigger parses an image, makes a request to the Face API, and returns the emotion data in the body. Lastly, they will **test their function** with Postman. <br />
![postman](https://user-images.githubusercontent.com/69332964/102019491-e808ee00-3d41-11eb-8101-fb4c30203a9a.gif)
<br />*By the end of the week, students will be able to send a request to their HTTP Trigger on Postman and receive emotion data in JSON.*

### **Learning Objectives**

- Parsing multipart data + Outputting in JSON
- Installing npm dependencies
- Making HTTP requests with fetch
- Working with the Face API + Reading its documentation
- Calling and Testing API Endpoints ft. Postman

### **Livestream**

In the livestream, we're going to code a HTTP trigger Azure Function that detects facial hair in a submitted picture.

- For the full video, look in the [video folder](https://github.com/emsesc/bitcamp-serverless/blob/master/week2/livestream/videos).
- For the full code, look in the [code folder](https://github.com/emsesc/bitcamp-serverless/blob/master/week2/livestream/code).

**We'll be going over how to:**

1. configure npm dependencies in Functions
2. parse multipart form data
3. create a Face API resource
4. make a HTTP request to the Face API
5. test the function using Postman

### Homework
Create a HTTP trigger Azure Function that uses the Face API to analyze emotion in a picture. 
- The step by step runthrough is located in the [issues folder](homework/issues). Follow the issues numerically to complete the project. 
- Any starter and solution code is in the [code folder](homework/code) in homework.

### :question: How will this help students?

The Week 2 livestream shows how to create an HTTP trigger that outputs facial hair information: close, but not quite what students have to do. Because the demonstration is not exactly what the students are coding (an emotion reader), it gives them a chance to figure out some aspects of the project on their own. In addition to this, the livestream shows another example of how the Face API and HTTP trigger can be used.
