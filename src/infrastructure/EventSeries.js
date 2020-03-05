const { get, keys } = require('lodash');

class EventSeries {
  constructor(timespan) {
    this.timespan = timespan;
    this.events = [];
  }

  addEvent(event) {
    this.events = [
      ...this.events,
      {
        timestamp: Date.now(),
        event,
      },
    ];

    const now = Date.now();

    if (now - this.events[0].timestamp > this.timespan) {
      this.events = this.events.filter(
        eventData => (now - eventData.timestamp < this.timespan),
      );
    }
  }

  getFilteredEvents(filter) {
    return this.events
      .filter(
        e => keys(filter).reduce((acc, key) => acc && (get(e.event, key) === filter[key]), true),
      )
      .map(eventData => eventData.event);
  }

  removeFilteredEvents(filter) {
    this.events = this.events
      .filter(
        e => !keys(filter).reduce((acc, key) => acc && (get(e.event, key) === filter[key]), true),
      );
  }
}

module.exports = EventSeries;
