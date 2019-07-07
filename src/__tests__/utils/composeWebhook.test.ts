// tslint:disable-next-line:no-implicit-dependencies
import composeWebhook from '../../utils/composeWebhook';
import WebhookRequest from '../../types/Discord/WebhookRequest';
import Webhook from '../../types/Webhook';

describe("composeWebhook", () => {
  it.only('it should compose a valid webhook object', () => {
    const description = 'Test Description';
    const webhook: Webhook = {
      issue_number: 'Test',
      issue_title: 'Test',
      github_url: 'Test',
      user_name: 'Test',
      organization: 'Test',
      repo: 'Test',
    } as Webhook;

    const expectedResponse = {
      username: 'Zenhub',
      embeds: [
        {
          title: `#${webhook.issue_number}:${webhook.issue_title}`,
          description,
          url: webhook.github_url,
          color: 0x00d090, 
          author: {
            name: webhook.user_name.replace(/\s/g,''),
            icon_url: `https://avatars.githubusercontent.com/${webhook.user_name}`.replace(/\s/g,''),
          },
          footer: {
            text: `${webhook.organization}/${webhook.repo}`,
          },
        },
      ],
    } as WebhookRequest;

    const generatedWebhook = composeWebhook(webhook, description);

    expect(generatedWebhook).toMatchObject(expectedResponse);
  });

  it.only('it should remove whitespace from username', () => {
    const description = 'Test Description';
    const webhook: Webhook = {
      issue_number: 'Test',
      issue_title: 'Test',
      github_url: 'Test',
      user_name: 'Test Test',
      organization: 'Test',
      repo: 'Test',
    } as Webhook;

    const author = {
      name: webhook.user_name.replace(/\s/g,''),
      icon_url: `https://avatars.githubusercontent.com/${webhook.user_name}`.replace(/\s/g,''),
    };

    const generatedWebhook = composeWebhook(webhook, description);
    
    if(!!generatedWebhook.embeds && generatedWebhook.embeds[0] && generatedWebhook.embeds[0].author) {
      expect(generatedWebhook.embeds[0].author.name).toBe(author.name);
      expect(generatedWebhook.embeds[0].author.icon_url).toBe(author.icon_url);
    } else {
      expect(generatedWebhook.embeds && generatedWebhook.embeds.length).toBeTruthy();
    }
  });
});
