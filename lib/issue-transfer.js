var request = require('request');

module.exports = {
  sendDiscordMessage: function(webhook) {
    var message = {
      username: 'ZenHub',
      content: 'Issue #' + webhook.issue_number + ' "' + webhook.issue_title + '" moved from "' + webhook.from_pipeline_name + '" to "' + webhook.to_pipeline_name + '"'
    }

    var postOptions = {
      uri: process.env.DISCORD_WEBHOOK,
      body: JSON.stringify(message),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    request(postOptions, function (error, response) {
      console.log(error, response.body);
      return;
    });
  }
}