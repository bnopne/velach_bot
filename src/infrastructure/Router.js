class Router {
  constructor(routes) {
    this.routes = routes;
  }

  route(telegramEntity) {
    const matchingRoutes = this.routes.filter(route => route.isMatching(telegramEntity));
    return Promise.all(matchingRoutes.map(route => route.process(telegramEntity)));
  }
}


module.exports = Router;
