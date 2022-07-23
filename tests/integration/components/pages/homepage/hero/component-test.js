import { module, test } from 'qunit';
import { setupRenderingTest } from 'interflux-group/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pages/homepage/hero', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Pages::Homepage::Hero />`);

    assert.dom('h1').exists();
    assert
      .dom('h1')
      .hasText(
        'Chemistry, machines and know-how for electronics manufacturers'
      );
  });
});
