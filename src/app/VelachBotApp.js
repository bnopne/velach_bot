const Application = require('../infrastructure/Application');

// message routes
const BikecheckRoute = require('./message-routes/Bikecheck');
const CheckBikeRoute = require('./message-routes/CheckBike');
const SetStravaRoute = require('./message-routes/SetStrava');
const HelpRoute = require('./message-routes/Help');
const AnnounceRoute = require('./message-routes/Announce');
const TopRoute = require('./message-routes/Top');
const DeletedRoute = require('./message-routes/Deleted');
const TopSellingRoute = require('./message-routes/TopSelling');

// callback query routes
const LikeRoute = require('./callback-query-routes/Like');
const DislikeRoute = require('./callback-query-routes/Dislike');
const NextBikecheckRoute = require('./callback-query-routes/NextBikecheck');
const PreviousBikecheckRoute = require('./callback-query-routes/PreviousBikecheck');
const DeleteBikecheckRoute = require('./callback-query-routes/DeleteBikecheck');
const BanBikecheckCallbackQueryRoute = require('./callback-query-routes/BanBikecheck');
const NextDeletedBikechecRoute = require('./callback-query-routes/NextDeletedBikecheck');
const PreviousDeletedBikechecRoute = require('./callback-query-routes/PreviousDeletedBikecheck');
const RestoreBikechecRoute = require('./callback-query-routes/RestoreBikecheck');
const TopBikecheckRoute = require('./callback-query-routes/TopBikecheck');
const TopSellingBikecheckRoute = require('./callback-query-routes/TopSellingBikecheck');
const ToggleOnSaleBikecheckRoute = require('./callback-query-routes/ToggleOnSale');

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
      TopSellingRoute,
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
      TopSellingBikecheckRoute,
      ToggleOnSaleBikecheckRoute,
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
