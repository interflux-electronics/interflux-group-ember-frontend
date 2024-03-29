import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class IndexRoute extends Route {
  @service headData;
  @service cache;
  @service store;

  activate() {
    this.headData.setProperties({
      loadMapBox: true
    });
  }

  model() {
    return hash({
      companies:
        this.cache.companies ||
        this.store.query('company', {
          filter: { shownOnGroupWebsite: 'true' },
          include: ['public_members', 'public_members.person', 'country'].join(
            ','
          )
        }),
      countries: this.cache.countries || this.store.findAll('country'),
      markets: this.cache.markets || this.store.findAll('company-market')

      // error: new Promise((resolve, reject) => setTimeout(reject, 1 * 1000))
      // delay: new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    });
  }
}
