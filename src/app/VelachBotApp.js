const Application = require('../infrastructure/Application');

// message routes
const BikecheckRoute = require('./messageRoutes/BikecheckRoute/BikecheckRoute');
const CheckBikeRoute = require('./messageRoutes/CheckBikeRoute/CheckBikeRoute');
const SetStravaRoute = require('./messageRoutes/SetStravaRoute/SetStravaRoute');
const HelpRoute = require('./messageRoutes/HelpRoute/HelpRoute');
const AnnounceRoute = require('./messageRoutes/AnnounceRoute/AnnouneRoute');

// callback query routes
const LikeRoute = require('./callbackQueryRoutes/LikeRoute/LikeRoute');
const DislikeRoute = require('./callbackQueryRoutes/DislikeRoute/DislikeRoute');
const NextBikecheckRoute = require('./callbackQueryRoutes/NextBikecheckRoute/NextBikecheckRoute');
const PreviousBikecheckRoute = require('./callbackQueryRoutes/PreviousBikecheckRoute/PreviousBikecheckRoute');
const DeleteBikecheckRoute = require('./callbackQueryRoutes/DeleteBikecheckRoute/DeleteBikecheckRoute');
const BanBikecheckCallbackQueryRoute = require('./callbackQueryRoutes/BanBikecheckRoute/BanBikecheckRoute');

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
