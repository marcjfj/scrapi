import { makeAbsoluteUrl } from '../utils';

// check if it's a Youtube link and return the ID
const getYoutubeId = (url: string) => {
  var regExp = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
  var match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : '';
};

interface twitter {
  tweetId: string | undefined;
  twitterUser: string | undefined;
}
// Check if it's a Twitter link and then return an object
// the function will find either the tweet ID or, if it's a profile link,
// then it populates the twitterUser prop instead

const getTwitterData = (url: string) => {
  const twitterData: twitter = {
    tweetId: '',
    twitterUser: '',
  };
  console.log(url);
  if (url.includes('twitter.com')) {
    if (url.includes('/status/')) {
      twitterData.tweetId = url.split('/').pop();
    } else if (url.split('/').length > 1) {
      twitterData.twitterUser = url.split('/').pop();
    }
  }
  return twitterData;
};

interface meta {
  title: string;
  description: string;
  images: Array<string | null>;
  primaryImage: string | null;
  domain: string;
}
// get the general metadata
const getMetaData = (dom: any, url: string) => {
  const protocol = url.includes('http://') ? 'http' : 'https';

  // extracting the domain from the full url
  const domain = url
    .replace('https://', '')
    .replace('http://', '')
    .split('/')
    .shift();

  const metaObj: meta = {
    title: '',
    description: '',
    images: [],
    primaryImage: '',
    domain: '',
  };

  // look for data from Open Graph first
  // fall back to generic metadata
  metaObj.title =
    dom.window.document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute('content') ||
    dom.window.document.querySelector('title')?.textContent;

  metaObj.description =
    dom.window.document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute('content') ||
    dom.window.document
      .querySelector('meta[name=description]')
      ?.getAttribute('content');

  // Search for all images on the page and return an array of their urls
  metaObj.images = Array.from(dom.window.document.querySelectorAll('img')).map(
    (img: any) => {
      const src = img.getAttribute('src');
      return makeAbsoluteUrl(src, protocol, domain);
    }
  );

  // set the primary image based on the Open Graph data,
  // fallback to the first image on the page
  metaObj.primaryImage =
    makeAbsoluteUrl(
      dom.window.document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content'),
      protocol,
      domain
    ) || metaObj.images[0];

  return metaObj;
};

export { getYoutubeId, getMetaData, getTwitterData };
