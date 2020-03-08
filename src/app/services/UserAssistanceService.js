const Service = require('../../infrastructure/Service');
const EventSeries = require('../../infrastructure/EventSeries');
const messages = require('../../text/messages');
const config = require('../../settings');

const TIME_WINDOW = config.get('usage.userCommandExecutionFailTrackingTimeWindow');
const TRESHOLD = config.get('usage.userCommandExecutionFailTreshold');

class UserAssistanceService extends Service {
  constructor(bot, eventBus) {
    super(bot, eventBus);

    this.eventBus.onUserFailsToExecuteCommand(this.onUserFailsToExecuteCommand.bind(this));
    this.commandFailsSeries = new EventSeries(TIME_WINDOW * 1000);
  }

  async onUserFailsToExecuteCommand(event) {
    this.commandFailsSeries.addEvent(event);

    const filter = {
      command: event.command,
      userId: event.userId,
      chatId: event.chatId,
    };

    const userFailsInChat = this.commandFailsSeries.getFilteredEvents(filter);

    if (userFailsInChat.length > TRESHOLD) {
      await this.bot.sendMessage(event.chatId, messages.userAssistance.tryHelp());
      this.commandFailsSeries.removeFilteredEvents(filter);
    }
  }
}

module.exports = UserAssistanceService;
