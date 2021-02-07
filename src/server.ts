import express from 'express';
import cors from 'cors';
import axios from 'axios';
import {JSDOM} from 'jsdom';
let app = express()
app.use(cors());

const getYoutubeId = (url : string) =>{
  var regExp = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
  var match = url.match(regExp);
  return (match && match[1].length==11)? match[1] : '';
}

app.get('/', (req, res) => {
  res.json({something: 'nice'})
})

app.get('/:url', async (req, res) => {
  const url = req.params.url.replace(/~/g, '/')
  .replace(/_dm_question_mark_/g, '?')
  .replace(/_dm_equal_sign_/g, '=')
  .replace(/_dm_ampersand_/g, '&');
  let data;
  try {
    const response = await axios.get(`https://${url}`);
    data = response.data;
  } catch (e) {
    console.log(e);
  }
  console.log(data);
  // const browser = await puppeteer.launch({headless: false});
  // const page = await browser.newPage();
  // await page.goto(`https://${url}`);
  const dom= new JSDOM(data);
  const title = dom.window.document.querySelector('meta[property="og:title"]')?.getAttribute('content') 
    || dom.window.document.querySelector('title')?.textContent;
  const description = dom.window.document.querySelector('meta[property="og:description"]')?.getAttribute('content')
  || dom.window.document.querySelector('meta[name=description]')?.getAttribute('content');

  const domain = url.split('/').shift();
  const makeAbsoluteUrl = (src : string | null | undefined) => {
    if (src?.includes('https://') || src?.includes('http://') || src?.includes('//')){
      return src;
    } else {
      const firstChar = src?.substring(0,1);
      if (firstChar === '/') {
        return `https://${domain}${src}`
      } else {
        return src ? `https://${domain}/${src}` : null;
      }
    }
  }
  const images = (Array.from(dom.window.document.querySelectorAll('img'))).map((img) => { 
    const src = img.getAttribute('src');
    return makeAbsoluteUrl(src);
  });
  const primaryImage = makeAbsoluteUrl(dom.window.document.querySelector('meta[property="og:image"]')?.getAttribute('content')) || images[0];
  
  interface responseDef {
    title : string | null | undefined;
    description : string | null | undefined;
    images : Array<string | null>;
    domain : string | null | undefined;
    primaryImage: string | null | undefined;
    tweetId: string | null | undefined;
    twitterUser: string | null | undefined;
    youtubeId: string | null | undefined;
    url: string;
  }

  const responseObj : responseDef  = {
    title,
    description,
    images,
    domain,
    primaryImage,
    tweetId: '',
    twitterUser: '',
    youtubeId: '',
    url: `https://${url}` ,
   };
   
  responseObj.youtubeId = getYoutubeId(`https://${url}`);
  if (url.includes('twitter.com')) {
    if(url.includes('/status/')) {
      responseObj.tweetId = url.split('/').pop();
    } else if (url.split('/').length > 1){
      responseObj.twitterUser = url.split('/').pop();
    }
  }
  res.json(responseObj);
});
let server = app.listen(1337, () => {
  console.log(`server running at port http://localhost/${server.address()?.port}`)
});