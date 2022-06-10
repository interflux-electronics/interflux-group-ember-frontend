import { helper } from '@ember/component/helper';
import ENV from 'interflux-group/config/environment';

export default helper(function env(key) {
  return ENV[key];
});
