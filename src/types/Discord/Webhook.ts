import Snowflake from "../Snowflake";
import User from "./User";

export default interface Webhook {
  id?: Snowflake;
  guild_id?: Snowflake;
  channel_id?: Snowflake;
  user?: User;
  name?: string;
  avatar?: string;
  token?: string;
};
