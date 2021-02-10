import express from 'express';
import cors from 'cors';
import { handleUrl } from './utils';
const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const url =
    typeof req.query.url === 'string' ? decodeURIComponent(req.query.url) : '';
  const responseObj = await handleUrl(url);
  res.json(responseObj);
});

export default app;
