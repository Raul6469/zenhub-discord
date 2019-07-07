import ISO8601 from '../../ISO8601';
import integer from '../../integer';
import Footer from './Footer';
import Image from './Image';
import Thumbnail from './Thumbnail';
import Video from './Video';
import Provider from './Provider';
import Author from './Author';
import Field from './Field';

export default interface Embed {
  title?: string;
  type?: 'rich'
  description?: string;
  url?: string;
  timestamp?: ISO8601;
  color?: integer | string;
  footer?: Footer;
  image?: Image;
  thumbnail?: Thumbnail;
  video?: Video;
  provider?: Provider;
  author?: Author;
  fields?: [Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?, Field?];
}

export { 
  Footer,
  Image,
  Thumbnail,
  Video,
  Provider,
  Author,
  Field,
};
