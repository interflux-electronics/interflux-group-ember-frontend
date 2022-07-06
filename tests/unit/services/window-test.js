import { module, test } from 'qunit';
import { setupTest } from 'interflux-group/tests/helpers';

module('Unit | Service | window', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:window');
    assert.ok(service);
  });
});
