const getBikecheckCaption = (likes, dislikes, stravaLink, index = 0, totalBikechecks = 1, rank) => {
  const rankText = rank === -1 ? '' : `Место _#${rank}_ в общем рейтинге\n`;
  const postitionText = totalBikechecks > 1 ? `_Байкчек ${index + 1} из ${totalBikechecks}_` : '';
  const stravaText = stravaLink ? `[Страва](${stravaLink})` : '_Страву не показывал_';
  return `${rankText}${postitionText}\nНравится: ${likes}\nНе нравится: ${dislikes}\n${stravaText}`;
};

const getTopCaption = (position, likes, dislikes, user) => ([
  `*Байкчек #${position}, владелец* [${user.firstName}](tg://user?id=${user.id})`,
  `👍: _${likes}_ ÷ 👎: _${dislikes}_`,
  user.stravaLink ? `[Страва](${user.stravaLink})` : '_Страву не показывал_',
].join('\n'));

module.exports = {
  getBikecheckCaption,
  getTopCaption,
};
