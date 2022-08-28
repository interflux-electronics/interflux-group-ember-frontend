import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class CompanyModel extends Model {
  @attr('string') businessName;
  @attr('string') legalName;
  @attr('string') address;
  @attr('string') phone;
  @attr('string') fax;
  @attr('string') emailGeneral;
  @attr('string') emailSupport;
  @attr('string') emailOrders;
  @attr('string') emailAccounting;
  @attr('string') website;
  @attr('string') latitude;
  @attr('string') longitude;
  @attr('string') description;
  @attr('number') order;
  @attr('boolean') public;
  @attr('boolean') isHeadquarter;
  @attr('boolean') shownOnGroupWebsite;
  @attr('string') coreActivity;
  @attr('string') history;
  @attr('number') rankOnGroupWebsite;
  @attr('number') headCount;
  @attr('boolean') showMarkets;

  @belongsTo('country') country;

  @hasMany('company-member') companyMembers;
  @hasMany('company-market') companyMarkets;

  get members() {
    const publicMembers = this.companyMembers
      .filterBy('public')
      .mapBy('person');

    if (publicMembers.length !== this.companyMembers.length) {
      console.warn(
        `a non-public member of ${this.businessName} has been serialised`
      );
    }

    return publicMembers.sortBy('rankAmongMembers');
  }

  get markets() {
    return this.companyMarkets.sortBy('rankAmongMembers').mapBy('country');
  }

  get rank() {
    return this.order || 999;
  }

  get websiteForRobots() {
    return this.website ? this.website.replace(/\/$/, '') : null;
  }

  get websiteForHumans() {
    return this.website
      ? this.website
          .replace('https://', '')
          .replace('http://', '')
          .replace(/\/$/, '')
      : null;
  }

  get hasOneEmail() {
    return (
      this.emailGeneral &&
      !(this.emailSupport || this.emailOrders || this.emailAccounting)
    );
  }

  get phoneForRobots() {
    return this.phone ? this.phone.replace(/\s|-|\.|\(|\)/g, '') : null;
  }

  get phoneForHumans() {
    return this.phone;
  }

  get faxForHumans() {
    return this.fax ? this.fax.replace(/\s|-|\.|\(|\)/g, '') : null;
  }

  get faxForRobots() {
    return this.fax ? this.fax.replace(/\s|-|\.|\(|\)/g, '') : null;
  }

  get hasMultipleContacts() {
    return this.companyMembers && this.companyMembers.length > 1;
  }

  get slug() {
    return this.businessName
      .replace(/\(|\)|®|,|\.|\//g, '')
      .replace(/\s/g, '-');
  }

  get heroLogo() {
    const { slug } = this;
    const logo = slug.replace('-China-', '-').toLowerCase();

    return logo;
  }

  get heroImage() {
    const country = this.slug.toLowerCase().replace('interflux-', '');

    return `hero-${country}`;
  }

  get showMarkets() {
    return !['Interflux Electronics', 'Interflux China, Beijing'].includes(
      this.businessName
    );
  }

  get shownPeopleCount() {
    return this.members.length;
  }

  get hiddenPeopleCount() {
    return this.headCount - this.members.length;
  }
}
