const express = require('express')
const { Capi } = require('@tencent-sdk/capi')
const path = require('path')
const bodyParser = require('body-parser')
const cloudbaseSDK = require('@cloudbase/node-sdk')
const cors = require('cors')
const app = express()

app.use(cors())

if (!process.env.TENCENT_SECRET_ID) {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') })
}

const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY } = process.env

const cloudbase = cloudbaseSDK.init({
  secretId: TENCENT_SECRET_ID,
  secretKey: TENCENT_SECRET_KEY,
  env: 'env-sjtzqhgs',
})
const db = cloudbase.database()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`chenng's serverless server`)
})

app.get('/api/translate', async (req, res) => {
  const text = req.query.text

  const client = new Capi({
    Region: 'ap-beijing',
    SecretId: TENCENT_SECRET_ID,
    SecretKey: TENCENT_SECRET_KEY,
    ServiceType: 'tmt',
    host: 'tmt.tencentcloudapi.com',
  })

  const resq = await client.request(
    {
      Action: 'TextTranslate',
      Version: '2018-03-21',
      SourceText: text,
      Source: 'auto',
      Target: 'zh',
      ProjectId: 0,
    },
    {
      host: 'tmt.tencentcloudapi.com',
    },
  )
  res.send(resq.Response.TargetText)
})

app.get('/api/words/get', async (req, res) => {
  try {
    const resWords = await db.collection('words').get()
    const resObj = {}
    resWords.data.forEach(word => {
      const key = Object.keys(word)
        .filter(key => key !== '_id')[0]
      resObj[key] = {
        id: word['_id'],
        value: word[key]
      }
    })
    res.send(resObj)
  } catch (err) {
    res.send(err.message)
  }

})

app.post('/api/words/set',  async (req, res) => {
  if (!req.body.word) {
    res.send('error')
  }

  try {
    const resAdd = await db.collection('words')
    .add(req.body.word)
    res.send(resAdd)
  } catch (err) {
    res.send(err.message)
  }
})

app.post('/api/words/delete', async (req, res) => {
  try {
    const resDelete = await db.collection('words')
      .doc(req.body.id)
      .remove()
    res.send(resDelete)
  } catch (err) {
    res.send(err.message)
  }
})

app.listen(8080)

console.log('listening 8080')

module.exports = app