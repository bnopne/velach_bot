const getBikecheckCaption = (likes, dislikes, stravaLink, index = 0, totalBikechecks = 1) => {
  const stravaText = stravaLink ? `[Страва](${stravaLink})` : '_Страву не показывал_';
  const postitionText = totalBikechecks > 1 ? `_Байкчек ${index + 1} из ${totalBikechecks}_` : '';
  return `${postitionText}\nНравится: ${likes}\nНе нравится: ${dislikes}\n${stravaText}`;
};

module.exports = {
  getBikecheckCaption,
};
