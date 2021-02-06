const express = require('express');
const cors = require('cors')
const cheerio = require('cheerio');
const axios = require('axios');
let app = express()
app.use(cors());

app.get('/:url', async (req, res) => {
  const url = req.params.url.replace(/~/g, '/');
  let data;
  try {
    const response = await axios.get(`https://${url}`);
    data = response.data;
  } catch (e) {
    console.log(e);
  }
  console.log(data);
  const $ = cheerio.load(data);
  const title = $('title').text();
  res.json(title);
})

let server = app.listen(3000, () => {
  console.log(`server running at port http://localhost/${server.address().port}`)
})