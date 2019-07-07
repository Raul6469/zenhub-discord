import Snowflake from '../Snowflake';
import integer from '../integer';

export default interface Attachment {
  id: Snowflake;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: integer;
  width?: integer;
}
