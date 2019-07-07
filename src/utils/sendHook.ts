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

  return fetch(config().discord.webhook, postOptions);
};
