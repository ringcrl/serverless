const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const useragent = require('express-useragent');

const handler = require('./handler');

const app = express();

if (!process.env.TENCENT_SECRET_ID) {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(useragent.express());

// 根路由
app.get('/', handler.root.handler);

// 单词翻译
app.get('/api/translate', handler.translator.query);

// 单词本
app.get('/api/words/get', handler.words.get);
app.post('/api/words/set', handler.words.set);
app.post('/api/words/delete', handler.words.del);

// scheme跳转
app.get('/s/:schemeId', handler.scheme.handler);

const PORT = 8080;
app.listen(PORT);
console.log(`Listening ${PORT}`);

module.exports = app;
