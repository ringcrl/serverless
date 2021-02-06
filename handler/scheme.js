function noop() {}

async function handler(req, res) {
  try {
    let { schemeId } = req.params;

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
        default:
          noop();
      }
    }

    if (!schemeId.endsWith('://')) {
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
