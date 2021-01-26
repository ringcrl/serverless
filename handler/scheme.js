async function handler(req, res) {
  try {
    let { schemeId } = req.params;

    if (schemeId === 'WeRead' && !req.useragent.isMobile) {
      res.status = 302;
      res.redirect('https://weread.qq.com/');
      return;
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
