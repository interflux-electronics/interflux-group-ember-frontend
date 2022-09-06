import EmberRouter from '@ember/routing/router';
import config from 'interflux-group/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('member', { path: '/member/:slug' });
});
