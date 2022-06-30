import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pages/homepage/locations', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Pages::Homepage::Locations />`);

    const headings = this.element.querySelectorAll('h2');
    const expected = [
      'Coordinated by 14 companies across the world',
      'Servicing 89+ countries'
    ];

    assert.strictEqual(headings.length, 2);
    assert.strictEqual(headings[0].innerText, expected[0]);
    assert.strictEqual(headings[1].innerText, expected[1]);
  });
});
