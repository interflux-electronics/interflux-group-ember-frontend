import { module, test } from 'qunit';
import { setupTest } from 'interflux-group/tests/helpers';

module('Unit | Route | temporary', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:temporary');
    assert.ok(route);
  });
});
