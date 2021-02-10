function noop() {}

async function handler(req, res) {
  try {
    let { schemeId } = req.params;

    schemeId = decodeURIComponent(schemeId);

    if (!req.useragent.isMobile) {
      switch (schemeId) {
        case 'WeRead':
          res.status = 302;
          res.redirect('https://weread.qq.com/');
          return;
        case 'bilibili':
          res.status = 302;
          res.redirect('https://www.bilibili.com/');
          return;
        case 'youtube':
          res.status = 302;
          res.redirect('https://www.youtube.com/');
          return;
        case 'Twitter':
          res.status = 302;
          res.redirect('https://twitter.com/home');
          return;
        case `${'wxef5e7e4'}${'01d2565f7'}`:
          res.status = 302;
          res.redirect(`${'https://'}${'km'}${'oa'}${'com'}`);
          return;
        case 'qqmusic':
          res.status = 302;
          res.redirect('qqmusicmac://1');
          return;
        case 'sinaweibo://discover':
          res.status = 302;
          res.redirect('https://s.weibo.com/top/summary');
          return;
        default:
          noop();
      }
    }

    if (!schemeId.includes('://')) {
      schemeId += '://';
    }

    res.status = 302;
    res.redirect(`${schemeId}1`);
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  handler,
};
