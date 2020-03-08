const Application = require('../infrastructure/Application');

// message routes
const BikecheckRoute = require('./messageRoutes/BikecheckRoute/BikecheckRoute');
const CheckBikeRoute = require('./messageRoutes/CheckBikeRoute/CheckBikeRoute');
const BanBikecheckRoute = require('./messageRoutes/BanBikecheckRoute/BanBikecheckRoute');
const UnbanBikecheckRoute = require('./messageRoutes/UnbanBikecheckRoute/UnbanBikecheckRoute');
const SetStravaRoute = require('./messageRoutes/SetStravaRoute/SetStravaRoute');
const HelpRoute = require('./messageRoutes/HelpRoute/HelpRoute');

// callback query routes
const LikeRoute = require('./callbackQueryRoutes/LikeRoute/LikeRoute');
const DislikeRoute = require('./callbackQueryRoutes/DislikeRoute/DislikeRoute');

// services
const UserAssistanceService = require('./services/UserAssistanceService');
const DonationReminderService = require('./services/DonationReminderService');

class VelachBotApp extends Application {
  static get messageRoutes() {
    return [
      BikecheckRoute,
      CheckBikeRoute,
      BanBikecheckRoute,
      UnbanBikecheckRoute,
      SetStravaRoute,
      HelpRoute,
    ];
  }

  static get callbackQueryRoutes() {
    return [
      LikeRoute,
      DislikeRoute,
    ];
  }

  static get services() {
    return [
      UserAssistanceService,
      DonationReminderService,
    ];
  }
}

module.exports = VelachBotApp;
