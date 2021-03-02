const Application = require('../infrastructure/Application');

// message routes
const BikecheckRoute = require('./messageRoutes/BikecheckRoute/BikecheckRoute');
const CheckBikeRoute = require('./messageRoutes/CheckBikeRoute/CheckBikeRoute');
const SetStravaRoute = require('./messageRoutes/SetStravaRoute/SetStravaRoute');
const HelpRoute = require('./messageRoutes/HelpRoute/HelpRoute');
const AnnounceRoute = require('./messageRoutes/AnnounceRoute/AnnouneRoute');
const TopRoute = require('./messageRoutes/TopRoute/TopRoute');
const DeletedRoute = require('./messageRoutes/DeletedRoute/DeletedRoute');

// callback query routes
const LikeRoute = require('./callbackQueryRoutes/LikeRoute/LikeRoute');
const DislikeRoute = require('./callbackQueryRoutes/DislikeRoute/DislikeRoute');
const NextBikecheckRoute = require('./callbackQueryRoutes/NextBikecheckRoute/NextBikecheckRoute');
const PreviousBikecheckRoute = require('./callbackQueryRoutes/PreviousBikecheckRoute/PreviousBikecheckRoute');
const DeleteBikecheckRoute = require('./callbackQueryRoutes/DeleteBikecheckRoute/DeleteBikecheckRoute');
const BanBikecheckCallbackQueryRoute = require('./callbackQueryRoutes/BanBikecheckRoute/BanBikecheckRoute');
const NextDeletedBikechecRoute = require('./callbackQueryRoutes/NextDeletedBikecheckRoute/NextDeletedBikecheckRoute');
const PreviousDeletedBikechecRoute = require('./callbackQueryRoutes/PreviousDeletedBikecheckRoute/PreviousDeletedBikecheckRoute');
const RestoreBikechecRoute = require('./callbackQueryRoutes/RestoreBikecheckRoute/RestoreBikecheckRoute');
const TopBikecheckRoute = require('./callbackQueryRoutes/TopBikecheckRoute/TopBikecheckRoute');

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
