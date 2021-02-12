/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

var count = 0;
var start;
var o = {}
var key = "Progress"
o[key] = []

const functions = require('./helpers');

module.exports = (app) => {
 app.log.info("Yay, the app was loaded!");
 app.on("push", async (context) => {
  o[key] = []
  count = 0
  // Executes for a push event on a repository with .bit
  app.log.info("Event: push")

  // Testing to see if this is the first time a template is created
  try {
    start = context.payload.commits[0].added[0].substring(0,4)
  } catch (e) {
    start = ""
  }


  if (start == ".bit") {
    app.log.info("Templated created...")
    app.log.info("Attempting to get YAML")
    var configyml = await functions.yamlFile(context)
    
    // start lab by executing what is in the before portion of config.yml
    let response = await context.octokit.repos.getContent({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      path:`.bit/responses/${configyml.before[0].body}`,
    });

    // Creating the .progress file that contains date and step
    var data = {
      stepTitle: configyml.steps[0].title,
      time: context.payload.commits[0].timestamp
    }
    o[key].push(data);

      try {
        await context.octokit.repos.createOrUpdateFileContents({
          owner: context.payload.repository.owner.login,
          repo: context.payload.repository.name,
          path: ".bit/.progress",
          message: "Track progress",
          content: Buffer.from(JSON.stringify(o)).toString('base64'),
          committer: {
            name: `bitcampdev`,
            email: "info@bitproject.org",
          },
          author: {
            name: `bitcampdev`,
            email: "info@bitproject.org",
          },
        })
      } catch (e) {
        return
      }

      response = Buffer.from(response.data.content, 'base64').toString()
      return await context.octokit.issues.create({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        title: configyml.before[0].title,
        body: response,
      })
   }
 });

// Triggers when a pull_request is closed or comment is created
 app.on(['pull_request.closed', 'issue_comment.created'], async (context) => {
   o = {};
   count = 0;
   try {
     user = context.payload.sender.login
   } catch (e) {
     user = ""
   }

   app.log.info(user)

   // Tests if the user created a comment, not the bot
   if (user != "bitcampdev[bot]") {
     var configyml = await functions.yamlFile(context)
     var countfile = await functions.getFileContent(context, ".bit/.camp")
     count = parseInt(countfile[1])
 
     for (y = 0; y < configyml.steps[count].actions.length; y++) {
       var array = configyml.steps[count].actions[y]
       app.log.info(array)
      
      // Executes an action based on the step in the YAML
       if (array.type == "respond") {
         const response = await functions.getFileContent(context, `.bit/responses/${array.with}`)
         const issueComment = context.issue({
           body: response[1],
           issue_number: array.issue,
         });
         context.octokit.issues.createComment(issueComment)
         app.log.info("Respond")
       }
       if (array.type == "createIssue") {
         const response = await functions.getFileContent(context, `.bit/responses/${array.body}`)
         const issueBody = context.issue({
           issue_number: array.issue,
           title: array.title,
           body: response[1],
         });
         app.log.info("createIssue")
         context.octokit.issues.create(issueBody)
       } 
       if (array.type == "closeIssue") {
         const payload = context.issue({
           state: "closed",
           issue_number: array.issue,
         })
         context.octokit.issues.update(payload)
       }
     }
     
     // Increment the count
     count += 1
     app.log.info("Count: " + count)
     
     // Update the .camp file with new count
     const update = context.issue({
       path: ".bit/.camp",
       message: "Update progress",
       content: Buffer.from(count.toString()).toString('base64'),
       sha: countfile[0].data.sha,
       committer: {
         name: `bitcampdev`,
         email: "info@bitproject.org",
       },
       author: {
         name: `bitcampdev`,
         email: "info@bitproject.org",
       },
     });
     context.octokit.repos.createOrUpdateFileContents(update)

    // Retrieve .progress and append new step time/data 
    var progressFile = await functions.getFileContent(context, ".bit/.progress")
    o = JSON.parse(Buffer.from(progressFile[0].data.content, 'base64').toString())

    try {
      data = {
        stepTitle: configyml.steps[count].title,
        time: context.payload.pull_request.merged_at,
      }
    } catch (e) {
      data = {
        stepTitle: configyml.steps[count].title,
        time: context.payload.comment.created_at,
      }
    }

    console.log("Data: " + JSON.stringify(data))
    o[key].push(data); 
    console.log(JSON.stringify(o))
    const progressUpdate = context.issue({
      path: ".bit/.progress",
      message: "Update progress",
      content: Buffer.from(JSON.stringify(o)).toString('base64'),
      sha: progressFile[0].data.sha,
      committer: {
        name: `bitcampdev`,
        email: "info@bitproject.org",
      },
      author: {
        name: `bitcampdev`,
        email: "info@bitproject.org",
      },
      
    });
    return await context.octokit.repos.createOrUpdateFileContents(progressUpdate)
    }
 });
};