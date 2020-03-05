const Application = require('../../infrastructure/Application');

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
}


module.exports = VelachBotApp;
