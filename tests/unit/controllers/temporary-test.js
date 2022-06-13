import { module, test } from 'qunit';
import { setupTest } from 'interflux-group/tests/helpers';

module('Unit | Controller | temporary', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:temporary');
    assert.ok(controller);
  });
});
