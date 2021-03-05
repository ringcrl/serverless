function noop() {}

async function handler(req, res) {
  try {
    let { schemeId } = req.params;

    schemeId = decodeURIComponent(schemeId);

    if (!schemeId.includes('://')) {
      schemeId += '://';
    }

    if (!req.useragent.isMobile) {
      // PC端
      switch (schemeId) {
        case 'WeRead://':
          res.status = 302;
          res.redirect('https://weread.qq.com/');
          return;
        case 'bilibili://':
          res.status = 302;
          res.redirect('https://www.bilibili.com/');
          return;
        case 'youtube://':
          res.status = 302;
          res.redirect('https://www.youtube.com/');
          return;
        case 'Twitter://':
          res.status = 302;
          res.redirect('https://twitter.com/home');
          return;
        case `${'wxef5e7e4'}${'01d2565f7'}://`:
          res.status = 302;
          res.redirect(`${'https://'}${'km'}.${'oa'}.${'com'}`);
          return;
        case 'qqmusic://':
          res.status = 302;
          res.redirect('qqmusicmac://');
          return;
        case 'sinaweibo://discover':
          res.status = 302;
          res.redirect('https://s.weibo.com/top/summary');
          return;
        default:
          noop();
      }
    } else {
      // 移动端
      switch (schemeId) {
        case `${'wxef5e7e4'}${'01d2565f7'}://`:
          res.status = 302;
          res.redirect(`${'wxef5e7e4'}${'01d2565f7'}://1`);
          return;
        default:
          res.status = 302;
          res.redirect(`${schemeId}`);
      }
    }
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  handler,
};
