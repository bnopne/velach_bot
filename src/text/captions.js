function getBikecheckCaption(
  likes,
  dislikes,
  stravaLink,
  index = 0,
  totalBikechecks = 1,
  rank,
  onSale,
) {
  const lines = [
    rank === -1 ? null : `Место _${rank}_ в общем рейтинге`,
    totalBikechecks > 1 ? `_Байкчек ${index + 1} из ${totalBikechecks}_` : null,
    `Нравится: _${likes}_\nНе нравится: _${dislikes}_`,
    stravaLink ? `[Страва](${stravaLink})` : '_Страву не показывал_',
    onSale ? '*Кстати, этот байк продается!*' : null,
  ];
  return lines.filter((line) => Boolean(line)).join('\n');
}

function getTopCaption(position, likes, dislikes, user, onSale) {
  return [
    `*${position} место,* [владелец](tg://user?id=${user.id})`,
    `👍: _${likes}_ ÷ 👎: _${dislikes}_`,
    user.stravaLink ? `[Страва](${user.stravaLink})` : '_Страву не показывал_',
    onSale ? '*Кстати, этот байк продается!*' : null,
  ].filter((line) => Boolean(line)).join('\n');
}

function getTopSellingCaption(position, user) {
  return [
    '*Топовые байки на продажу*',
    `_${position} место,_ [владелец](tg://user?id=${user.id})`,
  ].join('\n');
}

module.exports = {
  getBikecheckCaption,
  getTopCaption,
  getTopSellingCaption,
};
