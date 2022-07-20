require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const auth = require('./routes/auth');
const PORT = process.env.PORT || 3000;
const helper = require('./helpers/response');

app.use(express.json());

app.use(helper);
app.use(`${process.env.BASE_URL}`, routes);
app.use(`/auth/`, auth);
// run app
app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
