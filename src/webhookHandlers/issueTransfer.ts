import { config } from 'firebase-functions';
import fetch, { RequestInit } from 'node-fetch';
import IssueTransfer from '../types/Webhook/IssueTransfer';

const sendDiscordMessage = (webhook: IssueTransfer) => {
  const message = {
    username: 'Zenhub',
    embeds: [
      {
        title: '#' + webhook.issue_number + ' : ' + webhook.issue_title,
        description: 'Moved from "' + webhook.from_pipeline_name + '" to "' + webhook.to_pipeline_name + '"',
        url: webhook.github_url,
        color: '0153170', 
        author: {
          name: webhook.user_name,
          icon_url: 'https://avatars.githubusercontent.com/' + webhook.user_name,
        },
        footer: {
          text: webhook.organization + '/' + webhook.repo,
        },
      },
    ],
  };

  const postOptions: RequestInit = {
    method: 'post',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(config().discord.webhook, postOptions);
};

export default sendDiscordMessage;
