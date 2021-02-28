const {
  bikecheck, checkbike, setstrava, help,
} = require('./commands');

module.exports = {
  banBikecheck: {
    replySomeone: () => 'Ответь кому-нибудь!',
    cantBanOwnBike: () => 'Ты не можешь забанить свой байк!',
    doesntHaveBike: () => 'Похоже, что у этого товарища нет велосипеда!',
    done: () => 'Забанил!',
  },
  bikecheck: {
    tooManyBikechecks: () => 'У тебя слишком много байкчеков',
    doesntHaveBike: () => 'Этот беспруфный кукарек не показывал свою повозку!',
    bikeWasBanned: () => 'Повозка этого велана была признана неподходящей и забанена с позором!',
    wasBanned: () => 'Все повозки этого велана были забанены в этом чате, показывать нечего',
    error: () => 'Произошла досадная ошибка',
    nothingToShow: () => 'Похоже пользователь удалил все байкчеки, либо их забанили в этом чате',
  },
  checkBike: {
    replyOnYourMessage: () => 'Ответь на свое сообщение, в котором есть картинка с велосипедом!',
    notYourMessage: () => 'Это не твое сообщение, запости картинку сам!',
    cantSeePhoto: () => 'Не вижу фотокарточки с велосипедом!',
    done: () => 'Чекнул, кекнул!',
  },
  setStrava: {
    replyOnMessageWithLink: () => 'Ответь на сообщение со ссылкой на твой профиль в страве',
    noLinks: () => 'Тут нет ссылок',
    cantFindLink: () => 'Не могу понять где тут ссылка на страву, отправь ее ОТДЕЛЬНЫМ сообщением и попробуй еще раз',
    done: () => 'Готово!',
  },
  unbanBikecheck: {
    replySomeone: () => 'Ответь кому-нибудь!',
    cantUnbanOwnBike: () => 'Ты не мог забанить свой байк, значит не можешь и разбанить!',
    doesntHaveBike: () => 'Похоже, что у этого товарища нет велосипеда!',
    done: () => 'Разбанил!',
  },
  help: {
    info: () => `Поясняю:\n\
      Команда _${bikecheck}_ показывает велосипед, если просто пишешь команду - показывает твой велосипед, если пишешь команду в ответ на чье-то сообщение, то показывает велосипед отправителя этого сообщения.\n\
      Команда _${checkbike}_ устанавливает тебе новую фотку велосипеда. Сначала постишь в чат фотку своего велика (отправляй картинкой, а не файлом), потом отвечаешь на сообщение с фоткой этой командой.\n\
      Команда _${setstrava}_ устанавливает ссылку на страву, которая будет отображаться в байкчеке. Как и c новым байкчеком: постишь ссылку на страву отдельным сообщением, отвечаешь на него командой.\n\
      Команда _${help}_ показывает этот текст.`,
  },
  like: {
    cantVoteForOwnBike: () => 'Вы не можете голосовать за свой байк',
    done: () => 'Ваш голос учтен',
  },
  dislike: {
    cantVoteAgainstOwnBike: () => 'Вы не можете голосовать против своего байка',
    done: () => 'Ваш голос учтен',
  },
  userAssistance: {
    tryHelp: () => 'Не получается? Возможно /help поможет тебе',
  },
  auth: {
    onlyAdminsCanDoThat: () => 'Только администраторы могут это сделать',
    cantDoInPrivateChatsAndChannels: () => 'Нельзя выполнить в приватных чатах и каналах',
    restricted: () => 'Вам нельзя!',
  },
  deleteBikecheck: {
    onlyOwnerCanDoThat: () => 'Только владелец байкчека может его удалить',
    done: () => 'Удалил',
  },
  common: {
    noBikechecks: () => 'У пользователя больше нет байкчеков',
    error: () => 'Произошла досадная ошибка',
  },
};
