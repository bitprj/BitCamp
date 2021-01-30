/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
 var yamlfile;
 var configyml;
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
    } catch (e) {
      console.log(e);
    }
    app.log.info("YAML file reached")

    // start lab by executing what is in the before portion of config.yml
    var response = await context.octokit.repos.getContent({
      owner:"bitprj",
      repo:"BitCamp",
      path:`Slack-Apps/homework/responses/${configyml.before.body}`,
    });
    const issueBody = context.issue({
      title: configyml.before.title,
      body: response,
    });
    return context.octokit.issues.create(issueBody)
  });

  if (configyml) {
    for (i = 0; i < configyml.length; i++) {
      let trigger = configyml.steps[i].event
      while (!flag) {
        app.on(trigger, async (content) => {
          for (y = 0; y < configyml.steps[i].actions.length; y++) {
            var array = configyml.yml.steps[i].actions[y]
            if (array[y].type == "respond") {
              var response = await context.octokit.repos.getContent({
                owner:"bitprj",
                repo:"BitCamp",
                path:`Slack-Apps/homework/responses/${array[y].with}`,
              });
              const issueComment = context.issue({
                body: response,
              });
              return context.octokit.issues.create(issueComment)
            }
            if (array[y].type == "createIssue") {
              var response = await context.octokit.repos.getContent({
                owner:"bitprj",
                repo:"BitCamp",
                path:`Slack-Apps/homework/responses/${array[y].with}`,
              });
              const issueBody = context.issue({
                issue_number: array[y].issue,
                title: array[y].title,
                body: response,
              });
              return context.octokit.issues.create(issueBody)
            } 
            if (array[y].type == "closeIssue") {
              const payload = context.issue({
                state: "closed",
              })
              return context.octokit.issues.update(payload)
            }
          }
          flag = true
        });
      }
    }
  }

  app.on("issues.opened", async (context) => {
    app.log.info(context.payload.issue.repository_url)
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
