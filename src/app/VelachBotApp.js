const Application = require('../infrastructure/Application');

// message routes
const BikecheckRoute = require('./message-routes/BikecheckRoute');
const CheckBikeRoute = require('./message-routes/CheckBikeRoute');
const SetStravaRoute = require('./message-routes/SetStravaRoute');
const HelpRoute = require('./message-routes/HelpRoute');
const AnnounceRoute = require('./message-routes/AnnounceRoute');
const TopRoute = require('./message-routes/TopRoute');
const DeletedRoute = require('./message-routes/DeletedRoute');

// callback query routes
const LikeRoute = require('./callback-query-routes/LikeRoute');
const DislikeRoute = require('./callback-query-routes/DislikeRoute');
const NextBikecheckRoute = require('./callback-query-routes/NextBikecheckRoute');
const PreviousBikecheckRoute = require('./callback-query-routes/PreviousBikecheckRoute');
const DeleteBikecheckRoute = require('./callback-query-routes/DeleteBikecheckRoute');
const BanBikecheckCallbackQueryRoute = require('./callback-query-routes/BanBikecheckRoute');
const NextDeletedBikechecRoute = require('./callback-query-routes/NextDeletedBikecheckRoute');
const PreviousDeletedBikechecRoute = require('./callback-query-routes/PreviousDeletedBikecheckRoute');
const RestoreBikechecRoute = require('./callback-query-routes/RestoreBikecheckRoute');
const TopBikecheckRoute = require('./callback-query-routes/TopBikecheckRoute');

// services
const UserAssistanceService = require('./services/UserAssistanceService');
const MetricsService = require('./services/MetricsService');

class VelachBotApp extends Application {
  static get messageRoutes() {
    return [
      BikecheckRoute,
      CheckBikeRoute,
      SetStravaRoute,
      HelpRoute,
      AnnounceRoute,
      TopRoute,
      DeletedRoute,
    ];
  }

  static get callbackQueryRoutes() {
    return [
      LikeRoute,
      DislikeRoute,
      PreviousBikecheckRoute,
      NextBikecheckRoute,
      DeleteBikecheckRoute,
      BanBikecheckCallbackQueryRoute,
      NextDeletedBikechecRoute,
      PreviousDeletedBikechecRoute,
      RestoreBikechecRoute,
      TopBikecheckRoute,
    ];
  }

  static get services() {
    return [
      UserAssistanceService,
      MetricsService,
    ];
  }
}

module.exports = VelachBotApp;
