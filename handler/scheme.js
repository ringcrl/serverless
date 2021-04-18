function noop() {}

const KM = `${'wxef5e7e4'}${'01d2565f7'}://`;
const TOPHUB = 'tophub://ranklist';
const EU_DIC = 'eudic://';
const WE_READ = 'WeRead://';

function getHandledScheme(schemeId) {
  let newSchemeId;
  switch (schemeId) {
    case 'km':
      return KM;
    case 'tophub':
      return TOPHUB;
    case 'dic':
      return EU_DIC;
    case 'read':
      return WE_READ;
    default:
      newSchemeId = decodeURIComponent(schemeId);
      if (!newSchemeId.includes('://')) {
        newSchemeId += '://';
      }
      return newSchemeId;
  }
}

async function handler(req, res) {
  try {
    const { schemeId } = req.params;

    const handledSchemeId = getHandledScheme(schemeId);

    if (!req.useragent.isMobile) {
      // PC端
      switch (handledSchemeId) {
        case WE_READ:
          res.status = 302;
          res.redirect('https://weread.qq.com/');
          break;
        case KM:
          res.status = 302;
          res.redirect(`${'https://'}${'km'}.${'oa'}.${'com'}`);
          return;
        case TOPHUB:
          res.status = 302;
          res.redirect('https://tophub.today/');
          break;
        default:
          noop();
      }
    } else {
      // 移动端
      switch (handledSchemeId) {
        case KM:
          res.status = 302;
          res.redirect(`${KM}1`);
          break;
        default:
          res.status = 302;
          res.redirect(`${handledSchemeId}`);
      }
    }
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  handler,
};
