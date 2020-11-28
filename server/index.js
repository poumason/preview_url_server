const express = require('express');
const ogs = require('open-graph-scraper');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/health', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(`I'm fine, thank you. (${Date.now()})`);
});

app.get('/', async (req, res) => {
  const link = req.query.link;
  if (link) {
    const result = await _getHTMLDom(link);
    res.send(result);
  }
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function _getHTMLDom (link) {
  console.log(link);
  try {
    const options = { url: link };
    // ogs(options)
    //   .then((data) => {
    //     const { error, result, response } = data;
    //     console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    //     console.log('result:', result); // This contains all of the Open Graph results
    //     console.log('response:', response); // This contains the HTML of page
    //   });
    const ogsResult = await ogs(options);
    console.log(ogsResult.result);

    return ogsResult.result;
  } catch (e) {
    console.error(e);
    return '';
  }
}
