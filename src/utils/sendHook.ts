import { config } from 'firebase-functions';
import fetch, { RequestInit } from 'node-fetch';
import WebhookRequest from '../types/Discord/WebhookRequest';

export default (message: WebhookRequest) => {
  const postOptions: RequestInit = {
    method: 'post',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log("Sending", postOptions, "to", config().discord.webhook);

  return fetch(config().discord.webhook, postOptions);
};
