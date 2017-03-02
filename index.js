const handlebars = require('handlebars');
const microApi = require('micro-api');

const videos = require('./videos.json');

const sourceHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="HandheldFriendly" content="true" />
    <title>{{title}}</title>
    <style>
      html,
      body,
      iframe {
        width: 100%;
        height: 100%;
        margin: 0px !important;
      }
    </style>
  </head>
  <body>
    <iframe width="560" height="315" src="{{src}}?autoplay=1&iv_load_policy=3&loop=1" frameborder="0"></iframe>
  </body>
</html>
`;

const getRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}

const handleRandomVideoJson = () => getRandomVideo();

const handleRandomVideoRender = () => {
  const randomVideo = getRandomVideo();
  return handlebars.compile(sourceHtml)({ title: randomVideo.title, src: randomVideo.src });
}

const api = microApi([
  {
    method: 'get',
    path: '/',
    handler: handleRandomVideoRender,
  },
  {
    method: 'get',
    path: '/json',
    handler: handleRandomVideoJson,
  }
]);

module.exports = api;
