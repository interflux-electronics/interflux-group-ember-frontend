import Model, { attr, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') chineseName;
  @attr('string') fullName;
  @attr('string') phone;
  @attr('string') email;
  @attr('boolean') public;
  @attr('string') avatarPath;
  @attr('string') avatarAlt;
  @attr('string') avatarCaption;
  @attr('string') avatarVariations;

  @hasMany('company') companies;
  @hasMany('company-member') companyMembers;

  get fullName() {
    return [this.firstName, this.lastName, this.chineseName].join(' ');
  }

  get memberOf() {
    return this.companies.mapBy('businessName').join(', ');
  }
}
