import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | env', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders', async function (assert) {
    // this.set('inputValue', 'cdnHost');

    // await render(hbs`{{env 'this.inputValue'}}`);
    await render(hbs`{{env 'cdnHost'}}`);

    assert.dom(this.element).hasText('http://localhost:9000');
  });
});
