import Embed from './Embed';

export default interface WebhookRequest {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  file?: Blob;
  embeds?: Embed[];
  payload_json?: JSON;
}
