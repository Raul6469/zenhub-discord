import EstimateSet from '../types/Webhook/EstimateSet';
import sendHook from '../utils/sendHook';
import composeWebhook from '../utils/composeWebhook';

const sendDiscordMessage = (webhook: EstimateSet) => {
  const description = `Estimate set to "${webhook.estimate}"`;
  const message = composeWebhook(webhook, description);

  return sendHook(message);
};

export default sendDiscordMessage;
