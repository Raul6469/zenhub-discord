import IssueReprioritized from '../types/Webhook/IssueReprioritized';
import sendHook from '../utils/sendHook';
import composeWebhook from '../utils/composeWebhook';

const sendDiscordMessage = (webhook: IssueReprioritized) => {
  const description = `Reprioritized from "${webhook.from_position}" to "${webhook.to_position}" on "${webhook.to_pipeline_name }"`;
  const message = composeWebhook(webhook, description);

  return sendHook(message);
};

export default sendDiscordMessage;
