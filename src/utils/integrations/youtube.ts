// check if it's a Youtube link and return the ID
const getYoutubeId = (url: string) => {
  var regExp = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
  var match = url.match(regExp);
  return { youtubeId: match && match[1].length == 11 ? match[1] : '' };
};

export default getYoutubeId;
