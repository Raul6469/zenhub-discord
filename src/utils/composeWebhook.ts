import WebhookRequest from '../types/Discord/WebhookRequest';
import Webhook from '../types/Webhook';

export default (webhook: Webhook, description: string): WebhookRequest => ({
  username: 'Zenhub',
    embeds: [
      {
        title: '#' + webhook.issue_number + ' : ' + webhook.issue_title,
        description,
        url: webhook.github_url,
        color: 0x00d090, 
        author: {
          name: webhook.user_name,
          icon_url: 'https://avatars.githubusercontent.com/' + webhook.user_name,
        },
        footer: {
          text: webhook.organization + '/' + webhook.repo,
        },
      },
    ],
} as WebhookRequest);