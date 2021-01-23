const { Capi } = require('@tencent-sdk/capi');

const { TENCENT_SECRET_ID, TENCENT_SECRET_KEY } = process.env;

async function query(req, res) {
  const { text } = req.query;

  const client = new Capi({
    Region: 'ap-beijing',
    SecretId: TENCENT_SECRET_ID,
    SecretKey: TENCENT_SECRET_KEY,
    ServiceType: 'tmt',
    host: 'tmt.tencentcloudapi.com',
  });

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
  );
  res.send(resq.Response.TargetText);
}

module.exports = {
  query,
};
