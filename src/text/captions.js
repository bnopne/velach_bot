const getBikecheckCaption = (likes, dislikes, stravaLink) => {
  const stravaText = stravaLink ? `[Страва](${stravaLink})` : '_Страву не показывал_';
  return `*За: ${likes}\nПротив: ${dislikes}*\n${stravaText}`;
};

module.exports = {
  getBikecheckCaption,
};
