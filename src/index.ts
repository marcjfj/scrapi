import app from './server';
const server: any = app.listen(1337, () => {
  console.log(
    `server running at port http://localhost/${server.address()?.port}`
  );
});
