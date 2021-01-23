const cloudbaseSDK = require('@cloudbase/node-sdk');

let _db;
function getDb() {
  if (_db) {
    return _db;
  }

  const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY } = process.env;
  const cloudbase = cloudbaseSDK.init({
    secretId: TENCENT_SECRET_ID,
    secretKey: TENCENT_SECRET_KEY,
    env: 'env-sjtzqhgs',
  });
  const db = cloudbase.database();
  _db = db;
  return _db;
}

async function get(req, res) {
  try {
    const db = getDb();
    const resWords = await db.collection('words').get();
    const resArr = [];
    resWords.data.forEach((word) => {
      resArr.push({
        id: word._id,
        value: word.word,
      });
    });
    res.send(resArr);
  } catch (err) {
    res.send(err.message);
  }
}

async function set(req, res) {
  if (!req.body.word) {
    res.send('error');
  }

  try {
    const db = getDb();
    const resAdd = await db.collection('words').add({
      word: req.body.word,
    });
    res.send(resAdd);
  } catch (err) {
    res.send(err.message);
  }
}

async function del(req, res) {
  try {
    const db = getDb();
    const resDelete = await db.collection('words').doc(req.body.id).remove();
    res.send(resDelete);
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
  set,
  del,
};
