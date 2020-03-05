const EventSeries = require('./EventSeries');
const { wait } = require('../utils/tests');

describe('test EventSeries class', () => {
  it('should add a new event', () => {
    expect.hasAssertions();

    const series = new EventSeries(60 * 1000);
    expect(series.events).toHaveLength(0);

    const event = {};

    series.addEvent(event);
    expect(series.events).toHaveLength(1);
  });

  it('should truncate old events on addition', async () => {
    expect.hasAssertions();

    const series = new EventSeries(100);

    const event1 = {
      id: 1,
    };
    const event2 = {
      id: 2,
    };
    series.addEvent(event1);
    series.addEvent(event2);
    expect(series.events).toHaveLength(2);

    await wait(100 + 10);

    const event3 = {
      id: 3,
    };
    series.addEvent(event3);
    expect(series.events).toHaveLength(1);
    expect(series.events[0].event.id).toBe(3);
  });

  it('should filter events', () => {
    expect.hasAssertions();

    const series = new EventSeries(100);

    const event1 = {
      id: 1,
      attr1: '1',
      attr2: '2',
    };
    const event2 = {
      id: 2,
      attr1: '1',
      attr2: '3',
    };
    const event3 = {
      id: 3,
      attr1: '2',
      attr2: '3',
    };
    const event4 = {
      id: 4,
      attr1: '4',
      attr2: '5',
    };
    const event5 = {
      id: 5,
      attr1: '4',
      attr2: '5',
    };

    series.addEvent(event1);
    series.addEvent(event2);
    series.addEvent(event3);
    series.addEvent(event4);
    series.addEvent(event5);

    let filtered;

    filtered = series.getFilteredEvents({ attr1: '1' });

    expect(filtered).toHaveLength(2);
    expect(filtered[0].id).toBe(1);
    expect(filtered[1].id).toBe(2);

    filtered = series.getFilteredEvents({ attr2: '3' });

    expect(filtered).toHaveLength(2);
    expect(filtered[0].id).toBe(2);
    expect(filtered[1].id).toBe(3);

    filtered = series.getFilteredEvents({ attr1: '2' });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(3);

    filtered = series.getFilteredEvents({ attr1: '4', attr2: '5' });
    expect(filtered).toHaveLength(2);
    expect(filtered[0].id).toBe(4);
    expect(filtered[1].id).toBe(5);
  });

  it('should remove events by filter', () => {
    expect.hasAssertions();

    const series = new EventSeries(100);

    const event1 = {
      id: 1,
      attr1: '1',
      attr2: '2',
    };
    const event2 = {
      id: 2,
      attr1: '1',
      attr2: '3',
    };
    const event3 = {
      id: 3,
      attr1: '2',
      attr2: '3',
    };
    const event4 = {
      id: 4,
      attr1: '4',
      attr2: '5',
    };
    const event5 = {
      id: 5,
      attr1: '4',
      attr2: '5',
    };

    series.addEvent(event1);
    series.addEvent(event2);
    series.addEvent(event3);
    series.addEvent(event4);
    series.addEvent(event5);

    series.removeFilteredEvents({
      attr1: '1',
      attr2: '2',
    });

    expect(series.events).toHaveLength(4);

    series.removeFilteredEvents({
      attr1: '4',
      attr2: '5',
    });

    expect(series.events).toHaveLength(2);
  });
});
