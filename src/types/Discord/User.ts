import Snowflake from "../Snowflake";
import integer from "../integer";

export default interface User {
  id?: Snowflake;
  username: string;
  discriminator?: string;
  avatar?: string;
  bot?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: integer;
  premium_type?: 1 | 2;
}
