import Model, { attr } from '@ember-data/model';

export default class CompanyModel extends Model {
  @attr('string') businessName;
  @attr('string') latitude;
  @attr('string') longitude;

  get slug() {
    return this.businessName
      .replace(/\(|\)|®|,|\.|\//g, '')
      .replace(/\s/g, '-');
  }
}
