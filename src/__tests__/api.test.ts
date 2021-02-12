import request from 'supertest';
import app from '../server';

let server = request(app);

describe('Get Stackoverflow URL', () => {
  test('should return a title, description and primaryImage', async (done) => {
    const result = await server.get(
      `/?url=${encodeURIComponent(
        'https://stackoverflow.com/questions/50497630/is-there-an-option-to-show-all-test-descriptions-when-i-run-jest-tests'
      )}`
    );
    expect(result.body.title.length).toBeTruthy();
    expect(result.body.description.length).toBeTruthy();
    expect(result.body.primaryImage.length).toBeTruthy();
    done();
  });
});
describe('Get Twitter info', () => {
  test('should return a tweetId', async (done) => {
    const result = await server.get(
      `/?url=${encodeURIComponent(
        'https://twitter.com/dan_abramov/status/1359273591976648705'
      )}`
    );
    expect(result.body.tweetId).toBeTruthy();
    done();
  });
  test('should return a twitter user', async (done) => {
    const result = await server.get(
      `/?url=${encodeURIComponent('https://twitter.com/freekmurze')}`
    );
    expect(result.body.twitterUser).toBeTruthy();
    done();
  });
});

describe('Get Youtube ID', () => {
  test('should return a tweetId', async (done) => {
    const result = await server.get(
      `/?url=${encodeURIComponent(
        'https://www.youtube.com/watch?v=ilZQFFi5DOQ&ab_channel=LaughTrax'
      )}`
    );
    expect(result.body.youtubeId).toBeTruthy();
    done();
  });
});
