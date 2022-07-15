import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CacheService extends Service {
  @tracked companies;
  @tracked countries;
  @tracked markets;
}
