import request from 'supertest';
import app from '../server';

let server = request(app);

// beforeEach((done) => {
//   server = app.listen(4000, (err) => {
//     if (err) return done(err);

//     agent = request.agent(server); // since the application is already listening, it should use the allocated port
//     done();
//   });
// });

// afterEach((done) => {
//   return server && server.close(done);
// });

describe('Get Endpoint', () => {
  test('should return an object', async (done) => {
    const result = await server.get(
      '/?url=https://stackoverflow.com/questions/12787781/type-definition-in-object-literal-in-typescript'
    );
    console.log(result);
    expect(result.type).toBe('application/json');
    expect(result.status).toBe(200);
    done();
  });
});
