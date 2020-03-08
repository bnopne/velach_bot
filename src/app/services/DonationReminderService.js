const Service = require('../../infrastructure/Service');
const EventSeries = require('../../infrastructure/EventSeries');
const messages = require('../../text/messages');
const config = require('../../settings');

const TIME_WINDOW = config.get('usage.interactionsTrackingTimeWindow');

class DonationReminderService extends Service {
  constructor(bot, eventBus) {
    super(bot, eventBus);

    this.eventBus.onUserInteracts(this.onUserInteracts.bind(this));
    this.interationsSeries = new EventSeries(TIME_WINDOW * 1000 * 60);
  }

  async onUserInteracts(event) {
    this.interationsSeries.addEvent(event);

    const filter = {
      chatId: event.chatId,
    };

    const interactionsInChat = this.interationsSeries.getFilteredEvents(filter);
    const frequency = Math.ceil(interactionsInChat.length / TIME_WINDOW);

    console.log(`chat ${event.chatId} interaction frequency = ${frequency}`);

    // if (frequency > config.get('usage.interactionsFrequencyTreshold')) {
    //   await this.bot.sendMessage(
    //     event.chatId,
    //     messages.donations.considerDonations(config.get('usage.donationsLink')),
    //     { parse_mode: 'markdown' },
    //   );

    //   this.interationsSeries.removeFilteredEvents(filter);
    // }
  }
}

module.exports = DonationReminderService;
