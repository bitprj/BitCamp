/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
 var yamlfile;
 var configyml;
 var count = 0;

const yaml = require('js-yaml');

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");
  app.on("installation.created", async (context) => {
    app.log.info("Installation created")
    
    let yamlfile = await context.octokit.repos.getContent({
      owner:"bitprj",
      repo:"BitCamp",
      path:"Javascript/homework/config.yml",
    });
    app.log.info("Attempting to get YAML")

    yamlfile = Buffer.from(yamlfile.data.content, 'base64').toString()
    try {
      let fileContents = yamlfile
      configyml = yaml.load(fileContents);
      start = true;
    } catch (e) {
      console.log("ERROR: " + e);
    }

    // start lab by executing what is in the before portion of config.yml
    let response = await context.octokit.repos.getContent({
      owner:"bitprj",
      repo:"BitCamp",
      path:`Javascript/homework/responses/${configyml.before[0].body}`,
    });

    await context.octokit.repos.createOrUpdateFileContents({
      owner: context.payload.installation.account.login,
      repo: context.payload.repositories[0].name,
      path: ".camp",
      message: "Update progress",
      content: Buffer.from("0").toString('base64'),
      committer: {
        name: `bitcampdev`,
        email: "info@bitproject.org",
      },
      author: {
        name: `bitcampdev`,
        email: "info@bitproject.org",
      },
    })

    response = Buffer.from(response.data.content, 'base64').toString()
    return await context.octokit.issues.create({
      owner: context.payload.installation.account.login,
      repo: context.payload.repositories[0].name,
      title: configyml.before[0].title,
      body: response,
    })
  });


  app.on(['pull_request.closed', 'issue_comment.created'], async (context) => {
    try {
      user = context.payload.sender.login
    } catch (e) {
      user = ""
    }

    app.log.info(user)

    if (user != "bitcampdev[bot]") {
      let yamlfile = await context.octokit.repos.getContent({
        owner:"bitprj",
        repo:"BitCamp",
        path:"Javascript/homework/config.yml",
      });
  
      yamlfile = Buffer.from(yamlfile.data.content, 'base64').toString()
      try {
        let fileContents = yamlfile
        configyml = await yaml.load(fileContents);
        start = true;
      } catch (e) {
        console.log("ERROR: " + e);
      }
  
      const progress = context.issue({
        path: ".camp",
      });
  
      var countfile = await context.octokit.repos.getContent(progress);
      count = Buffer.from(countfile.data.content, 'base64').toString()
      app.log.info(count)
  
      for (y = 0; y < configyml.steps[count].actions.length; y++) {
        var array = configyml.steps[count].actions[y]
        app.log.info(array)
  
        if (array.type == "respond") {
          var response = await context.octokit.repos.getContent({
            owner:"bitprj",
            repo:"BitCamp",
            path:`Javascript/homework/responses/${array.with}`,
          });
          response = Buffer.from(response.data.content, 'base64').toString()
          const issueComment = context.issue({
            body: response,
            issue_number: array.issue,
          });
          context.octokit.issues.createComment(issueComment)
          app.log.info("Respond")
        }
        if (array.type == "createIssue") {
  
          var response = await context.octokit.repos.getContent({
            owner:"bitprj",
            repo:"BitCamp",
            path:`Javascript/homework/responses/${array.body}`,
          });
          response = Buffer.from(response.data.content, 'base64').toString()
          const issueBody = context.issue({
            issue_number: array.issue,
            title: array.title,
            body: response,
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
  
      count = parseInt(count)
      count += 1
      app.log.info("Count: " + count)
      app.log.info(JSON.stringify(countfile))
      
      const update = context.issue({
        path: ".camp",
        message: "Update progress",
        content: Buffer.from(count.toString()).toString('base64'),
        sha: countfile.data.sha,
        committer: {
          name: `bitcampdev`,
          email: "info@bitproject.org",
        },
        author: {
          name: `bitcampdev`,
          email: "info@bitproject.org",
        },
      });
  
      return await context.octokit.repos.createOrUpdateFileContents(update)
    }
  });
};
