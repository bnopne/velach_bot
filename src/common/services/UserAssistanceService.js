const Service = require('../../infrastructure/Service');
const EventSeries = require('../../infrastructure/EventSeries');
const messages = require('../../text/messages');
const config = require('../../settings');

const COMMAND_EXECUTION_FAILS_TRACKING_TIME_WINDOW = config.get('usage.userCommandExecutionFailTrackingTimeWindow') * 1000;
const COMMAND_EXECUTION_FAILS_TRESHOLD = config.get('usage.userCommandExecutionFailTreshold');

class UserAssistanceService extends Service {
  constructor(bot, eventBus) {
    super(bot, eventBus);

    this.eventBus.onUserFailsToExecuteCommand(this.onUserFailsToExecuteCommand.bind(this));
    this.commandFailsSeries = new EventSeries(COMMAND_EXECUTION_FAILS_TRACKING_TIME_WINDOW);
  }

  async onUserFailsToExecuteCommand(event) {
    this.commandFailsSeries.addEvent(event);

    const filter = {
      command: event.command,
      userId: event.userId,
      chatId: event.chatId,
    };

    const userFailsInChat = this.commandFailsSeries.getFilteredEvents(filter);

    if (userFailsInChat.length > COMMAND_EXECUTION_FAILS_TRESHOLD) {
      await this.bot.sendMessage(event.chatId, messages.userAssistance.tryHelp());
      this.commandFailsSeries.removeFilteredEvents(filter);
    }
  }
}

module.exports = UserAssistanceService;
