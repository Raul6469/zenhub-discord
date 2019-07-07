import IssueTransfer from '../types/Webhook/IssueTransfer';
import sendHook from '../utils/sendHook';
import composeWebhook from '../utils/composeWebhook';

const sendDiscordMessage = (webhook: IssueTransfer) => {
  const description = 'Moved from "' + webhook.from_pipeline_name + '" to "' + webhook.to_pipeline_name + '"';
  const message = composeWebhook(webhook, description);

  return sendHook(message);
};

export default sendDiscordMessage;
