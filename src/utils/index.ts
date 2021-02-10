import axios from 'axios';
import { JSDOM } from 'jsdom';
import { getMetaData, getYoutubeId, getTwitterData } from './integrations';

// Check if the url is relative
// if so, build an absolute url and return it
const makeAbsoluteUrl = (
  src: string | null | undefined,
  protocol: string | null | undefined,
  domain: string | null | undefined
) => {
  if (
    src?.includes('https://') ||
    src?.includes('http://') ||
    src?.includes('//')
  ) {
    return src;
  } else {
    const firstChar = src?.substring(0, 1);
    if (firstChar === '/') {
      return `${protocol}://${domain}${src}`;
    } else {
      return src ? `${protocol}://${domain}/${src}` : null;
    }
  }
};

interface responseDef {
  title: string | null | undefined;
  description: string | null | undefined;
  images: Array<string | null>;
  domain: string | null | undefined;
  primaryImage: string | null | undefined;
  tweetId: string | null | undefined;
  twitterUser: string | null | undefined;
  youtubeId: string | null | undefined;
  url: string;
}
const handleUrl = async (url: string) => {
  let data;
  if (url) {
    try {
      const response = await axios.get(url);
      data = response.data;
    } catch (e) {
      return { error: 'Invalid API call' };
    }
  }

  const dom = new JSDOM(data);

  const responseObj: responseDef = {
    ...getMetaData(dom, url),
    ...getTwitterData(url),
    youtubeId: getYoutubeId(url),
    url,
  };
  return responseObj;
};
export { makeAbsoluteUrl, handleUrl };
