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
  if (url.includes('twitter.com')) {
    if (url.includes('/status/')) {
      twitterData.tweetId = url.split('/').pop();
    } else if (url.split('/').length > 1) {
      twitterData.twitterUser = url.split('/').pop();
    }
  }
  return twitterData;
};

export default getTwitterData;
