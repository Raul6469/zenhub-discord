import EstimateCleared from '../types/Webhook/EstimateCleared';
import sendHook from '../utils/sendHook';
import composeWebhook from '../utils/composeWebhook';

const sendDiscordMessage = (webhook: EstimateCleared) => {
  const description = 'Estimate Cleared';
  const message = composeWebhook(webhook, description);

  return sendHook(message);
};

export default sendDiscordMessage;
