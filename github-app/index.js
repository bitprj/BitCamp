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
      path:"Slack-Apps/homework/config.yml",
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
      path:`Slack-Apps/homework/responses/${configyml.before[0].body}`,
    });

    response = Buffer.from(response.data.content, 'base64').toString()
    return await context.octokit.issues.create({
      owner: context.payload.installation.account.login,
      repo: context.payload.repositories[0].name,
      title: configyml.before[0].title,
      body: response,
    })
  });


  app.on(['pull_request.closed', 'issue_comment.created'], async (context) => {
    app.log.info("[COUNT]" + count)
    let yamlfile = await context.octokit.repos.getContent({
      owner:"bitprj",
      repo:"BitCamp",
      path:"Slack-Apps/homework/config.yml",
    });

    yamlfile = Buffer.from(yamlfile.data.content, 'base64').toString()
    try {
      let fileContents = yamlfile
      configyml = await yaml.load(fileContents);
      start = true;
    } catch (e) {
      console.log("ERROR: " + e);
    }

    for (y = 0; y < configyml.steps[count].actions.length; y++) {
      var array = configyml.steps[count].actions[y]
      app.log.info(array)

      if (array.type == "respond") {
        var response = await context.octokit.repos.getContent({
          owner:"bitprj",
          repo:"BitCamp",
          path:`Slack-Apps/homework/responses/${array.with}`,
        });
        response = Buffer.from(response.data.content, 'base64').toString()
        const issueComment = context.issue({
          body: response,
          issue_number: array.issue,
        });
        app.log.info("Respond")
        return context.octokit.issues.createComment(issueComment)
      }
      if (array.type == "createIssue") {
        var response = await context.octokit.repos.getContent({
          owner:"bitprj",
          repo:"BitCamp",
          path:`Slack-Apps/homework/responses/${array.with}`,
        });
        response = Buffer.from(response.data.content, 'base64').toString()
        const issueBody = context.issue({
          issue_number: array.issue,
          title: array.title,
          body: response,
        });
        app.log.info("createIssue")
        return context.octokit.issues.create(issueBody)
      } 
      if (array[y].type == "closeIssue") {
        const payload = context.issue({
          state: "closed",
          issue_number: array.issue,
        })
        return context.octokit.issues.update(payload)
      }
    }
    count += 1
  })
};
