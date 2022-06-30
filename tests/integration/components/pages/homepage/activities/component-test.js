import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pages/homepage/activities', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Pages::Homepage::Activities />`);

    const headings = this.element.querySelectorAll('h2');
    const expected = [
      'Chemistry for soldering electronics',
      'Equipment for manufacturing electronics',
      'Know-how transfers'
    ];

    assert.strictEqual(headings.length, 3);
    assert.strictEqual(headings[0].innerText, expected[0]);
    assert.strictEqual(headings[1].innerText, expected[1]);
    assert.strictEqual(headings[2].innerText, expected[2]);
  });
});
