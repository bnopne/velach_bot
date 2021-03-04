function getBikecheckCaption(likes, dislikes, stravaLink, index = 0, totalBikechecks = 1, rank) {
  const lines = [
    rank === -1 ? null : `Место _#${rank}_ в общем рейтинге`,
    totalBikechecks > 1 ? `_Байкчек ${index + 1} из ${totalBikechecks}_` : null,
    `Нравится: _${likes}_\nНе нравится: _${dislikes}_`,
    stravaLink ? `[Страва](${stravaLink})` : '_Страву не показывал_',
  ];
  return lines.filter((line) => Boolean(line)).join('\n');
}

function getTopCaption(position, likes, dislikes, user) {
  return [
    `*Байкчек #${position}, владелец* [${user.firstName}](tg://user?id=${user.id})`,
    `👍: _${likes}_ ÷ 👎: _${dislikes}_`,
    user.stravaLink ? `[Страва](${user.stravaLink})` : '_Страву не показывал_',
  ].join('\n');
}

module.exports = {
  getBikecheckCaption,
  getTopCaption,
};
