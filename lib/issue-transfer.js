var request = require('request');

module.exports = {
  sendDiscordMessage: function(webhook) {
    var message = {
      username: 'ZenHub',
      embeds: [
        {
          title: '#' + webhook.issue_number + ' : ' + webhook.issue_title,
          description: 'Moved from "' + webhook.from_pipeline_name + '" to "' + webhook.to_pipeline_name + '"',
          url: webhook.github_url,
          color: '0153170', 
          author: {
            name: webhook.user_name,
            icon_url: 'https://avatars.githubusercontent.com/' + webhook.user_name
          },
          footer: {
            text: webhook.organization + '/' + webhook.repo
          }
        }
      ]
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