const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  if (Array.isArray(url)) {
    const results = await Promise.all(url.map(fetchData));
    res.json(results);
  } else {
    const result = await fetchData(url);
    res.json(result);
  }
});

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    return { error: `Failed to fetch data from ${url}` };
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});