import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';
import { Sample } from './components';

const express = require('express');

const app = express();
const development = (process.env.NODE_ENV || 'development') === 'development';

if (!development) app.use(express.static(`${__dirname}/assets`));

app.get('*', (req, res) => {
  const sampleComponent = (<Sample />);
  res.status(200).send(`<!doctype html>\n
  ${ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={sampleComponent}/>)}`); } // eslint-disable-line
);
app.listen(+process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err, 'this is the error', process.env.PORT);
  }
  console.info(`==> ✅  Test app now running on  http://localhost:${process.env.PORT || 5555}`);
});
