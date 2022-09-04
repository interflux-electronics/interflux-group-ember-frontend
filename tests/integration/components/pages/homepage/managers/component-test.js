import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pages/homepage/managers', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Pages::Homepage::Managers />`);

    const headings = this.element.querySelectorAll('h4');
    const expected = [
      'Daniel Werkhoven',
      'Annick Peeters',
      'Steven Teliszewski'
    ];

    assert.strictEqual(headings.length, 3);
    assert.strictEqual(headings[0].innerText, expected[0]);
    assert.strictEqual(headings[1].innerText, expected[1]);
    assert.strictEqual(headings[2].innerText, expected[2]);
  });
});
