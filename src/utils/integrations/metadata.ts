import { makeAbsoluteUrl } from '../index';
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

export default getMetaData;
