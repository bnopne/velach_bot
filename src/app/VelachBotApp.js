const Application = require('../infrastructure/Application');

// message routes
const BikecheckRoute = require('./message-routes/Bikecheck');
const CheckBikeRoute = require('./message-routes/CheckBike');
const SetStravaRoute = require('./message-routes/SetStrava');
const StartRoute = require('./message-routes/Start');
const AnnounceRoute = require('./message-routes/Announce');
const TopRoute = require('./message-routes/Top');
const DeletedRoute = require('./message-routes/Deleted');
const OnSaleRoute = require('./message-routes/OnSale');

// callback query routes
const LikeRoute = require('./callback-query-routes/Like');
const DislikeRoute = require('./callback-query-routes/Dislike');
const NextBikecheckRoute = require('./callback-query-routes/NextBikecheck');
const PreviousBikecheckRoute = require('./callback-query-routes/PreviousBikecheck');
const DeleteBikecheckRoute = require('./callback-query-routes/DeleteBikecheck');
const NextDeletedBikechecRoute = require('./callback-query-routes/NextDeletedBikecheck');
const PreviousDeletedBikechecRoute = require('./callback-query-routes/PreviousDeletedBikecheck');
const RestoreBikechecRoute = require('./callback-query-routes/RestoreBikecheck');
const TopBikecheckRoute = require('./callback-query-routes/TopBikecheck');
const ToggleOnSaleBikecheckRoute = require('./callback-query-routes/ToggleOnSale');
const ShowOnSaleBikecheck = require('./callback-query-routes/ShowOnSaleBikecheck');
const BumpOnSaleBikecheck = require('./callback-query-routes/BumpOnSaleBikecheck');
const SageOnSaleBikecheck = require('./callback-query-routes/SageOnSaleBikecheck');

// inline query routes
const BikecheckInlineQuery = require('./inline-query-routes/Bikecheck');

// services
const UserAssistanceService = require('./services/UserAssistanceService');
const MetricsService = require('./services/MetricsService');

class VelachBotApp extends Application {
  static get messageRoutes() {
    return [
      BikecheckRoute,
      CheckBikeRoute,
      SetStravaRoute,
      StartRoute,
      AnnounceRoute,
      TopRoute,
      DeletedRoute,
      OnSaleRoute,
    ];
  }

  static get callbackQueryRoutes() {
    return [
      LikeRoute,
      DislikeRoute,
      PreviousBikecheckRoute,
      NextBikecheckRoute,
      DeleteBikecheckRoute,
      NextDeletedBikechecRoute,
      PreviousDeletedBikechecRoute,
      RestoreBikechecRoute,
      TopBikecheckRoute,
      ToggleOnSaleBikecheckRoute,
      ShowOnSaleBikecheck,
      BumpOnSaleBikecheck,
      SageOnSaleBikecheck,
    ];
  }

  static get inlineQueryRoutes() {
    return [BikecheckInlineQuery];
  }

  static get services() {
    return [
      UserAssistanceService,
      MetricsService,
    ];
  }
}

module.exports = VelachBotApp;
