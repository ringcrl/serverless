const express = require('express')
const { Capi } = require('@tencent-sdk/capi')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

if (!process.env.TENCENT_SECRET_ID) {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
}

const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY } = process.env

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send('serverless-translate server')
})

app.get('/translate', urlencodedParser, async (req, res) => {
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

app.listen(8080)

module.exports = app